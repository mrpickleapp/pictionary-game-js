import numpy as np
import random
import os
import struct
from struct import unpack
import tensorflow as tf

def get_categories_from_data(folder, n=None):
    categories = []
    files = os.listdir(folder)

    for file in files:
        fname = file[12:-4]
        if len(fname) > 0:
            categories.append(fname)

    if n == None:
        return categories
    
    return categories[:n]

def unpack_drawing(file_handle):
    key_id, = unpack('Q', file_handle.read(8))
    country_code, = unpack('2s', file_handle.read(2))
    recognized, = unpack('b', file_handle.read(1))
    timestamp, = unpack('I', file_handle.read(4))
    n_strokes, = unpack('H', file_handle.read(2))
    image = []
    for i in range(n_strokes):
        n_points, = unpack('H', file_handle.read(2))
        fmt = str(n_points) + 'B'
        x = unpack(fmt, file_handle.read(n_points))
        y = unpack(fmt, file_handle.read(n_points))
        image.append((x, y))

    return {
        'key_id': key_id,
        'country_code': country_code,
        'recognized': recognized,
        'timestamp': timestamp,
        'image': image
    }


def unpack_drawings(filename):
    with open(filename, 'rb') as f:
        while True:
            try:
                yield unpack_drawing(f)
            except struct.error:
                break

def transform_strokes(strokes, max_val=255):
    min_x = max_val
    max_x = 0
    min_y = max_val
    max_y = 0
    for stroke in strokes:
        min_x = min(min(stroke[0]), min_x)
        max_x = max(max(stroke[0]), max_x)
        min_y = min(min(stroke[1]), min_y)
        max_y = max(max(stroke[1]), max_y)

    f = max_val / max(max(max_x - min_x, max_y - min_y), 1)     # prevent divide by 0

    resized_strokes = []
    for stroke in strokes:
        resized_strokes.append([
            [(point - min_x) * f for point in stroke[0]], [(point - min_y) * f for point in stroke[1]]
        ])

    return resized_strokes

def strokes_to_deltas(strokes, max_len=255, max_sequence_length=200, mode=0):
    """
    Convert strokes to a sequence of deltas and stroke flags.
    
    Parameters:
    - strokes: A list of strokes. Each stroke is a tuple of x and y coordinate sequences.
    - mode: If 0, the stroke flag is set at the beginning of each stroke (ie for reading)
            If 1, the stroke flag is set at the end of each stroke (ie for drawing)
    
    Returns:
    - A numpy array of shape (num_points, 3) where each point is represented by [dx, dy, stroke_flag].
    """
    deltas = []
    
    for stroke in strokes:
        x, y = stroke
        for i in range(len(x)):
            # Calculate delta
            dx = (x[i] - x[i-1] if i > 0 else x[i]) / max_len
            dy = (y[i] - y[i-1] if i > 0 else y[i]) / max_len
            # Check for new stroke
            if mode == 0:
                stroke_flag = 1 if i == 0 else 0
            if mode == 1:
                stroke_flag = 1 if i == len(x) - 1 else 0
            deltas.append([dx, dy, stroke_flag])

    # Padding the sequence with zeros to reach max_sequence_length
    padding_length = max_sequence_length - len(deltas)
    deltas.extend([[0, 0, 0]] * padding_length)
            
    return np.array(deltas[:max_sequence_length])

def get_train_test_data(folder, categories, train_size_per_cat, test_size_per_cat, mode=0):
    """
    Parameters:
    - Mode: 0 for reading images, 1 for drawing them (sets stroke flag differently)
    """
    
    num_categories = len(categories)

    X_train, Y_train, X_test, Y_test = [], [], [], []

    for category_id, category in enumerate(categories):
        fname = f"{folder}/full_binary_{category}.bin"
        drawings_generator = unpack_drawings(fname)
        while len(X_train) < train_size_per_cat * (category_id + 1):
            drawing = next(drawings_generator)
            if mode == 0:
                for i in range(1, len(drawing['image']) + 1):
                    strokes = transform_strokes(drawing['image'][:i])
                    deltas = strokes_to_deltas(strokes, mode=mode)
                    X_train.append(deltas)
                    Y_train.append(category_id)
            if mode == 1:
                strokes = transform_strokes(drawing['image'])
                deltas = strokes_to_deltas(strokes, mode=mode)
                X_train.append(deltas)
                Y_train.append(category_id)
        while len(X_test) < test_size_per_cat:
            drawing = next(drawings_generator)
            if mode == 0:
                for i in range(1, len(drawing['image']) + 1):
                    strokes = transform_strokes(drawing['image'][:i])
                    deltas = strokes_to_deltas(strokes, mode=mode)
                    X_test.append(deltas)
                    Y_test.append(category_id)
            if mode == 1:
                strokes = transform_strokes(drawing['image'])
                deltas = strokes_to_deltas(strokes, mode=mode)
                X_test.append(deltas)
                Y_test.append(category_id)

    X_train = tf.convert_to_tensor(X_train[:train_size_per_cat*num_categories])
    Y_train = tf.convert_to_tensor(Y_train[:train_size_per_cat*num_categories])
    X_test = tf.convert_to_tensor(X_test[:test_size_per_cat*num_categories])
    Y_test = tf.convert_to_tensor(Y_test[:test_size_per_cat*num_categories])

    return X_train, Y_train, X_test, Y_test

def ramer_douglas_peucker(x_points, y_points, epsilon):
    assert len(x_points) == len(y_points), "Mismatched input dimensions."
    points = list(zip(x_points, y_points))
    simplified = _rdp_recursive(points, epsilon)
    return [p[0] for p in simplified], [p[1] for p in simplified]

def _rdp_recursive(points, epsilon):
    dmax = 0.0
    index = 0
    start, end = points[0], points[-1]
    
    for i in range(1, len(points) - 1):
        d = point_line_distance(points[i], start, end)
        if d > dmax:
            index = i
            dmax = d

    if dmax >= epsilon:
        results1 = _rdp_recursive(points[:index + 1], epsilon)
        results2 = _rdp_recursive(points[index:], epsilon)
        simplified = results1[:-1] + results2
    else:
        simplified = [start, end]

    return simplified

def point_line_distance(point, line_start, line_end):
    num = abs((line_end[1] - line_start[1]) * point[0] - 
              (line_end[0] - line_start[0]) * point[1] + 
              line_end[0] * line_start[1] - 
              line_end[1] * line_start[0])
    if num == 0:
        return 0
    den = ((line_end[1] - line_start[1]) ** 2 + 
           (line_end[0] - line_start[0]) ** 2) ** 0.5
    if den == 0:
        return 0
    return num / den        # need to add divide by zero protection