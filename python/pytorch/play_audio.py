import subprocess
import shlex

# Having issues using the Audio node in VSCode Jupyter notebooks... so fall back to ffplay
def play_audio(file_name):
    subprocess.call(shlex.split(f'ffplay {file_name}'))