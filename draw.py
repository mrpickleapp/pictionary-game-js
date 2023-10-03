# takes user input in the form of drawn lines, and converts them into strokes for processing
# real-time predictions of drawing

import pygame
import numpy as np
import random

import classifier
import process

data_folder = 'data'
CATEGORIES = process.get_categories_from_data(data_folder)

MAX_SEQ_LEN = 200

model = classifier.RNN(input_shape=(MAX_SEQ_LEN, 3), num_categories=len(CATEGORIES), load_from_fname="best_model_weights.h5")

FPS = 30
OUTPUT_WIDTH = 255
OUTPUT_HEIGHT = OUTPUT_WIDTH   # these have to be the same

INPUT_MULT = 1
INPUT_WIDTH = OUTPUT_WIDTH * INPUT_MULT
INPUT_HEIGHT = INPUT_WIDTH

drawing = []
current_stroke = [[], []]

LOG_PEN_EVERY = 2
ticks_until_pen_log = 0
pen_is_down = False

PREDICT_EVERY = FPS
last_stroke = 0
last_prediction = 0


def draw_stroke(screen, stroke, colour="black"):
    pygame.draw.lines(screen, colour, False, list(zip(stroke[0], stroke[1])), width=3)

def draw_strokes(screen, strokes, colour="black"):
    for stroke in strokes:
        draw_stroke(screen, stroke, colour)

def predict(model, drawing):
    if len(drawing) == 0:
        return
    drawing = process.strokes_to_deltas(process.transform_strokes(drawing, OUTPUT_WIDTH), MAX_SEQ_LEN)
    drawing = np.expand_dims(drawing, axis=0)
    predictions = np.array(model.predict_single(drawing))
    return CATEGORIES[np.argmax(predictions)]

current_prediction = None

pygame.init()
screen = pygame.display.set_mode((INPUT_WIDTH, INPUT_HEIGHT))
pygame.display.set_caption(f"Draw: {random.choice(CATEGORIES)}")
font = pygame.font.SysFont(None, 24)
clock = pygame.time.Clock()
running = True

tick = 0
while running:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
            running = False

        elif event.type == pygame.MOUSEBUTTONDOWN:
            pen_is_down = True
            current_prediction = None
        
        elif event.type == pygame.MOUSEBUTTONUP:
            pen_is_down = False
            if len(current_stroke[0]) > 1:
                drawing.append(process.ramer_douglas_peucker(current_stroke[0], current_stroke[1], 2.0))
                last_stroke = tick
            current_stroke = [[], []]

        elif event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            current_prediction = None
            drawing = []
            pygame.display.set_caption(f"Draw: {random.choice(CATEGORIES)}")

    if pen_is_down:
        if tick % LOG_PEN_EVERY == 0:
            mouse_pos = pygame.mouse.get_pos()
            current_stroke[0].append(mouse_pos[0])
            current_stroke[1].append(mouse_pos[1])

    screen.fill((255, 255, 255))

    draw_strokes(screen, drawing, "black")
    if len(current_stroke[0]) > 1:
        draw_stroke(screen, current_stroke, "purple")

    if len(drawing) > 0:
        if last_stroke > last_prediction:
            current_prediction = predict(model, drawing)
            last_prediction = tick

    if current_prediction != None:
        text_surface = font.render(f"{current_prediction}?", True, "black")
        screen.blit(text_surface, (10, 10))

    pygame.display.flip()
    clock.tick(30)

pygame.quit()