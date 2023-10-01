import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
import xml.etree.ElementTree as ET
import matplotlib.cm as cm
from matplotlib.colors import Normalize

# 解析XML文件
tree = ET.parse('/home/ubuntu/server/download/2b4645e5e2df/gomo.xml')
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
data_b = data_b[:10]
data_c = data_c[:10]
data_m = data_m[:10]

# 提取标签和得分
labels_b, scores_b,p_value_b = zip(*data_b)
labels_c, scores_c,p_value_c = zip(*data_c)
labels_m, scores_m,p_value_m = zip(*data_m)

# 绘制柱状图
plt.figure(figsize=(16, 12))

plt.barh(range(len(labels_b)), scores_b, color='pink', label='Biological Process',labelsize=24)
plt.barh(range(len(labels_b), len(labels_b) + len(labels_c)), scores_c, color='green', label='Cellular Component',labelsize=24)
plt.barh(range(len(labels_b) + len(labels_c), len(labels_b) + len(labels_c) + len(labels_m)), scores_m, color='blue', label='Molecular Function',labelsize=24)

# 设置刻度和标签
plt.yticks(range(len(labels_b) + len(labels_c) + len(labels_m)), labels_b + labels_c + labels_m,fontproperties = 'Times New Roman', size = 24)
plt.xlabel('-log10(score)',fontdict={'family' : 'Times New Roman', 'size'   : 28})
plt.gca().invert_yaxis()  # 反转Y轴，使最高的柱状图在顶部
plt.legend()

plt.savefig('/home/ubuntu/server/download/2b4645e5e2df/histogram.png', dpi=300, bbox_inches='tight')
