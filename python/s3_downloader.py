import fire
import sys
sys.path.append('../common/py')
from s3 import create_s3_client
import os

def run(resource,target=None):
    if target is None: target = os.path.basename(resource)
    s3 = create_s3_client()
    print(f'FROM:{s3.bucket}/{s3.execution_id}')
    print(f'SOURCE:{resource}')
    print(f'TARGET:{target}')
    s3.get_object(resource,target)

# main
if __name__ == '__main__':
    fire.Fire(run)