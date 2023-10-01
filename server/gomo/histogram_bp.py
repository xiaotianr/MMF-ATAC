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
# 提取所需的数据
goterms = []
scores = []
for goterm in root.findall('.//goterm[@group="b"]'):
    name = goterm.get('name')
    score = float(goterm.get('score'))
    goterms.append(name)
    scores.append(score)

# 计算-pvalue的-log10值
pvalues = [-np.log10(float(goterm.get('pvalue'))) for goterm in root.findall('.//goterm[@group="b"]')]
# 排序并选择前10个结果
sorted_indices = np.argsort(scores)
top_10_indices = sorted_indices[:10]
goterms = [goterms[i] for i in top_10_indices]
scores = [-np.log10(scores[i]) for i in top_10_indices]
pvalues = [pvalues[i] for i in top_10_indices]

# 创建水平柱状图
fig, ax = plt.subplots(figsize=(10, 6))
cmap = cm.get_cmap('viridis')
norm = Normalize(vmin=min(pvalues), vmax=max(pvalues))
ax.barh(goterms, scores, color=[cmap(norm(pvalues[i])) for i in top_10_indices], edgecolor='black')

# 添加标签和标题
ax.set_xlabel('-log10(score)')
ax.set_ylabel('GO Description')
ax.set_title('BP')
ax.invert_yaxis()

# 显示颜色条
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array([])  # 不显示具体数值，只显示颜色映射
cbar = plt.colorbar(sm, ax=ax, orientation='vertical')
cbar.set_label('-log10(p-value)')
# cbar = plt.colorbar(ax.barh(goterms, scores, color=[norm(pvalues[i]) for i in top_10_indices], edgecolor='black'), ax=ax)
# cbar.set_label('-log10(p-value)')
plt.gca().invert_yaxis()  # 反转Y轴，使最高的柱状图在顶部
# 调整图的布局以避免标签重叠
plt.tight_layout()



plt.savefig('/home/ubuntu/server/download/2b4645e5e2df/histogram_bp.png', dpi=300, bbox_inches='tight')