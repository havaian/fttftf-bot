from RUTTS import TTS
from ruaccent import RUAccent
from datetime import datetime
import time
from pathlib import Path
import tts_preprocessor
import os


dir_path = Path.cwd()
model_name = 'TeraTTS/natasha-g2p-vits'
model_path = dir_path / 'model' / model_name
output_dir = dir_path / 'saved_tts_audio'


class Processor:
    def __init__(self,
                 model_path=model_path,
                 model_name=model_name,
                 output_dir=output_dir):

        self.model_path = model_path
        self.model_name = model_name
        self.output_dir = output_dir
        # print(model_path)
        if self.model_path.exists():
            #self.tts = TTS(model_path, add_time_to_end=0.8)      # add_time_to_end продолжительность аудио
            self.tts = TTS(model_path)
        else:
            print('Скачивание модели...')
            #self.tts = TTS(model_name, add_time_to_end=0.8)
            self.tts = TTS(model_name)

        if not self.output_dir.exists():
            os.makedirs(self.output_dir)
        
        self.accentizer = RUAccent(workdir="./model")
        self.accentizer.load(omograph_model_size='medium')


    def va_speak(self, text: str, play: bool=False, save: bool=False):
        time_stamp = str(int(time.time()))
        text = tts_preprocessor.preprocess(text)
        text = self.accentizer.process_all(text)
        audio = self.tts(text, play)
        if save:
            self.tts.save_wav(audio, f'{self.output_dir}/audio_{time_stamp}.wav')
        # print(text)
        return (22050, audio)


if __name__ == '__main__':
    sample = Processor()
    text = """1. Проверить состояние автомата QF1. Включить автомат QF1. При отключенном автомате QF1 мотор-вентилятор МВ1 не работает."""
    sample.va_speak(text, play=True, save=True)