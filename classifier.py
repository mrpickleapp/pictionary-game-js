import tensorflow as tf

class RNN:
    def __init__(self, input_shape, num_categories, learning_rate=0.001, load_from_fname=None):
        self.state_shape = input_shape
        self.num_categories = num_categories
        self.learning_rate = learning_rate
        self.model = self._build_model()
        if load_from_fname != None:
            self.model.load_weights(load_from_fname)

    def _build_model(self):
        model = tf.keras.models.Sequential()

        # Input layer
        model.add(tf.keras.layers.Input(shape=self.state_shape))

        # Masking layer
        model.add(tf.keras.layers.Masking(mask_value=0.))

        # 1D Convolutional Layers
        model.add(tf.keras.layers.Conv1D(32, 3, activation='relu'))
        model.add(tf.keras.layers.Conv1D(64, 3, activation='relu'))
        model.add(tf.keras.layers.MaxPooling1D(2))
        
        model.add(tf.keras.layers.Conv1D(128, 3, activation='relu'))
        model.add(tf.keras.layers.MaxPooling1D(2))

        # Recurrent layers (e.g., LSTM)
        model.add(tf.keras.layers.LSTM(128, return_sequences=True))
        model.add(tf.keras.layers.LSTM(128))

        # Dense layers
        model.add(tf.keras.layers.Dense(128, activation='relu'))
        model.add(tf.keras.layers.Dense(128, activation='relu'))

        # Output layer
        model.add(tf.keras.layers.Dense(self.num_categories, activation='softmax'))

        model.compile(loss='sparse_categorical_crossentropy', optimizer=tf.keras.optimizers.Adam(learning_rate=self.learning_rate), metrics=['accuracy'])

        return model

    def predict_single(self, X):
        return self.model.predict(X, verbose=0)[0]