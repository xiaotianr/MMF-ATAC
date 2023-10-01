import os
import sys,json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math

def shuffle(hash,filename):
    os.system("python2 /home/ubuntu/meme/bin/fasta-dinucleotide-shuffle -f ./upload/"+hash+"/"+filename+" > ./upload/"+hash+"/shuffle.fa")

def enrich(filename,hash,species):
    savepath="./download/"+hash
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    motif_database="./motif_database/HUMAN/HOCOMOCOv11_core_HUMAN_mono_meme_format.meme"
    if species=="mus":
        motif_database="./motif_database/MOUSE/HOCOMOCOv11_core_MOUSE_mono_meme_format.meme"
    elif species=="danio":
        motif_database="./motif_database/JASPAR/JASPAR2022_CORE_vertebrates_non-redundant_v2.meme"
    os.system("../meme5/bin/ame --verbose 1 --oc "+savepath+" --scoring avg --method fisher --hit-lo-fraction 0.25 --evalue-report-threshold 10.0 --control --shuffle-- --kmer 2 ./upload/"+hash+"/"+filename+" "+motif_database)

def histogram(filename,hash,species):
    savepath="./download/"+hash+"/"
    # 读取富集分析结果数据
    data = pd.read_csv(savepath+'ame.tsv', sep='\t', comment='#')

    p_values = -1 * data['p-value'].apply(lambda x: math.log10(x))  # 对p-value取对数并取负值
    motif_IDs = data['motif_ID']

    # 创建图表
    fig, ax = plt.subplots(figsize=(16, 10))

    # 绘制水平柱状图
    bar_width = 0.8
    bars = ax.barh(np.arange(len(motif_IDs)), p_values, color='skyblue', height=bar_width)

    # 设置y轴标签为motif_id
    ax.set_yticks(np.arange(len(data)))
    ax.set_yticklabels(data['motif_ID'],fontsize=24)

    # 设置x轴标签
    ax.set_xlabel('-log10(p-value)',fontsize=24)

    plt.gca().invert_yaxis()  # 反转Y轴，使最高的柱状图在顶部

    # 添加标题
    # plt.title('Motif Enrichment Analysis')

    # 显示图表
    plt.tight_layout()
    plt.savefig(savepath+'histogram.png', dpi=300, bbox_inches='tight')


def main():
    filename = sys.argv[1]
    hash = sys.argv[2]
    species = sys.argv[3]
    # shuffle(hash,filename)
    enrich(filename,hash,species)
    histogram(filename,hash,species)

if __name__ == '__main__':
    main()