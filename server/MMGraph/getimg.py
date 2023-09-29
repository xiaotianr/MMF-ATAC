import os
import csv
import argparse
import json
parser = argparse.ArgumentParser(description="Process ATAC-seq data.")
parser.add_argument('--dataset', default='GSE11420x',type=str,help='The prefix name of the dataset')
parser.add_argument('--hash', default='fbd7c1da229c4007bf2d7b8a1ba1cf03',type=str,help='The The hash of the task')
parser.add_argument('--genome', default='hg38',type=str,help='The hash of the task')
args = parser.parse_args()
def getimg(name):
    motiflogopath='./download/'+name+'/motif_logo'
    if not os.path.exists(motiflogopath):
        os.mkdir(motiflogopath)

    for f_name in os.listdir('./download/'+name+'/motif_fasta'):
        x=f_name[:f_name.find('.fa')]
        os.system('weblogo --format PNG --size large --resolution 1200 < ./download/'+name+'/motif_fasta/'+str(f_name) +' > ./download/'+name+'/motif_logo/'+x+'.png  --number-interval 1 --fineprint "" --errorbars NO --color-scheme "classic" --text-font "TimesNewRoman" --title-font "TimesNewRoman"')
        
if __name__=='__main__':
    name=args.hash
    getimg(name)
