import fire
import sys
import json
import os
sys.path.append('../src/common/py')
from s3 import S3Client

def run(target, save_output=False, execution_id='execution_2021_06_24'):
    dest = f'crawl/items/{target}'

    s3 = S3Client('storesdb', execution_id)
    text = s3.get_compressed_str(dest)
    j = json.loads(text)
    result = j.get('result')
    if result is not None:
        html = result['html']
        if save_output:
            open(target + '.html', 'w').write(html)
        else:
            print (html)
    else:
        print(j.get('error'))

# CLI
if __name__ == '__main__':
    fire.Fire(run)
