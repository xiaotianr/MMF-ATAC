import os
import sys,json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
import xml.etree.ElementTree as ET
import matplotlib.cm as cm
from matplotlib.colors import Normalize

def ama(filename,hash,species):
    savepath="./save/"+hash
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    if species=="homo":
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out1 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mammal_homo_sapiens_1000_199.na /home/ubuntu/gomo/gomo_databases/mammal_homo_sapiens_1000_199.na.bfile")
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out2 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mammal_mus_musculus_1000_199.na /home/ubuntu/gomo/gomo_databases/mammal_mus_musculus_1000_199.na.bfile")
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out3 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mammal_canis_familiaris_1000_199.na /home/ubuntu/gomo/gomo_databases/mammal_canis_familiaris_1000_199.na.bfile")
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out4 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mammal_equus_caballus_1000_199.na /home/ubuntu/gomo/gomo_databases/mammal_equus_caballus_1000_199.na.bfile")
    elif species=='mus':
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out1 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mouse_homo_sapiens_1000_199.na /home/ubuntu/gomo/gomo_databases/mouse_homo_sapiens_1000_199.na.bfile")
        os.system("ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out2 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mouse_mus_musculus_1000_199.na /home/ubuntu/gomo/gomo_databases/mouse_mus_musculus_1000_199.na.bfile")
        os.system("meme5/bin/ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out3 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mouse_canis_familiaris_1000_199.na /home/ubuntu/gomo/gomo_databases/mouse_canis_familiaris_1000_199.na.bfile")
        os.system("meme5/bin/ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out4 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mouse_equus_caballus_1000_199.na /home/ubuntu/gomo/gomo_databases/mouse_equus_caballus_1000_199.na.bfile")
        os.system("meme5/bin/ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out5 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/mouse_rattus_norvegicus_1000_199.na /home/ubuntu/gomo/gomo_databases/mouse_rattus_norvegicus_1000_199.na.bfile")
    elif species=='danio':
        os.system("meme5/bin/ama --pvalues --verbosity 1 --oc ./save/"+hash+"/ama_out1 ./upload/"+hash+"/"+filename+" /home/ubuntu/gomo/gomo_databases/fish_danio_rerio_1000_199.na /home/ubuntu/gomo/gomo_databases/fish_danio_rerio_1000_199.na.bfile")

def gomo(filename,hash,species):
    savepath="./download/"+hash
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    if species=="homo":
        os.system("../meme5/bin/gomo --nostatus --verbosity 1 --oc "+savepath+" --t 0.05 --shuffle_scores 1000 --dag ../gomo/gomo_databases/go.dag --motifs ./upload/"+hash+"/"+filename+" ../gomo/gomo_databases/mammal_homo_sapiens_1000_199.na.csv ./save/"+hash+"/ama_out1/ama.xml ./save/"+hash+"/ama_out2/ama.xml ./save/"+hash+"/ama_out3/ama.xml ./save/"+hash+"/ama_out4/ama.xml ")
    if species=="mus":
        os.system("../meme5/bin/gomo --nostatus --verbosity 1 --oc "+savepath+" --t 0.05 --shuffle_scores 1000 --dag ../gomo/gomo_databases/go.dag --motifs ./upload/"+hash+"/"+filename+" ../gomo/gomo_databases/mouse_mus_musculus_1000_199.na.csv ./save/"+hash+"/ama_out1/ama.xml ./save/"+hash+"/ama_out2/ama.xml ./save/"+hash+"/ama_out3/ama.xml ./save/"+hash+"/ama_out4/ama.xml ./save/"+hash+"/ama_out5/ama.xml")
    elif species=="danio":
        os.system("../meme5/bin/gomo --nostatus --verbosity 1 --oc "+savepath+" --t 0.05 --shuffle_scores 1000 --dag ../gomo/gomo_databases/go.dag --motifs ./upload/"+hash+"/"+filename+" ../gomo/gomo_databases/fish_danio_rerio_1000_199.na.csv ./save/"+hash+"/ama_out1/ama.xml")

def histogram(filename,hash,species):
    tree = ET.parse('./download/'+hash+'/gomo.xml')
    root = tree.getroot()

    data_b = []
    data_c = []
    data_m = []

    for goterm in root.findall('.//goterm'):
        group = goterm.get('group')
        name = goterm.get('name')
        score = -np.log10(float(goterm.get('score')))
        pvalue= float(goterm.get('pvalue'))

        if group == 'b':
            data_b.append((name, score,pvalue))
        elif group == 'c':
            data_c.append((name, score,pvalue))
        elif group == 'm':
            data_m.append((name, score,pvalue))

    # 选取每组中pvalue最小的10条数据
    data_b.sort(key=lambda x: x[2])
    data_c.sort(key=lambda x: x[2])
    data_m.sort(key=lambda x: x[2])
    data_b = data_b[:5]
    data_c = data_c[:5]
    data_m = data_m[:5]

    # 提取标签和得分
    labels_b, scores_b,p_value_b = zip(*data_b)
    labels_c, scores_c,p_value_c = zip(*data_c)
    labels_m, scores_m,p_value_m = zip(*data_m)

    # 绘制柱状图
    plt.figure(figsize=(20, 12))

    plt.barh(range(len(labels_b)), scores_b, color='pink', label='Biological Process')
    plt.barh(range(len(labels_b), len(labels_b) + len(labels_c)), scores_c, color='green', label='Cellular Component')
    plt.barh(range(len(labels_b) + len(labels_c), len(labels_b) + len(labels_c) + len(labels_m)), scores_m, color='blue', label='Molecular Function')
    plt.legend(prop={'size': 24},loc='lower right')
    # 设置刻度和标签
    plt.yticks(range(len(labels_b) + len(labels_c) + len(labels_m)), labels_b + labels_c + labels_m,size = 24)
    plt.xlabel('-log10(score)' ,fontdict={ 'size'   : 28})
    plt.gca().invert_yaxis()  # 反转Y轴，使最高的柱状图在顶部
    # plt.legend()
    plt.savefig('./download/'+hash+'/histogram.png', dpi=300, bbox_inches='tight')

def main():
    filename = sys.argv[1]
    hash = sys.argv[2]
    species = sys.argv[3]
    ama(filename,hash,species)
    gomo(filename,hash,species)
    histogram(filename,hash,species)

if __name__ == '__main__':
    main()