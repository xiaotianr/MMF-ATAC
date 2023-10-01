import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math

# 读取富集分析结果数据
data = pd.read_csv('/home/ubuntu/server/download/2b4645e5e2df/ame_out/ame.tsv', sep='\t', comment='#')

p_values = -1 * data['p-value'].apply(lambda x: math.log10(x))  # 对p-value取对数并取负值
motif_IDs = data['motif_ID']

# 创建图表
fig, ax = plt.subplots(figsize=(10, 6))

# 绘制水平柱状图
bar_width = 0.8
bars = ax.barh(np.arange(len(motif_IDs)), p_values, color='skyblue', height=bar_width)

# 设置y轴标签为motif_id
ax.set_yticks(np.arange(len(data)))
ax.set_yticklabels(data['motif_ID'])

# 设置x轴标签
ax.set_xlabel('-log10(p-value)')

plt.gca().invert_yaxis()  # 反转Y轴，使最高的柱状图在顶部

# 添加标题
plt.title('Motif Enrichment Analysis')

# 显示图表
plt.tight_layout()




# # 选择需要绘制的数据列，例如p-value、motif_ID、E-value
# p_values = -1 * data['p-value'].apply(lambda x: math.log10(x))  # 对p-value取对数并取负值
# motif_IDs = data['motif_ID']
# e_values = data['E-value']

# # # 设置颜色映射，根据p-value值设置颜色
# # colors = p_values

# # 创建颜色映射，根据-p值的大小设置颜色
# norm = plt.Normalize(p_values.min(), p_values.max())
# cmap = plt.get_cmap('viridis')

# # 创建柱状图
# plt.figure(figsize=(12, 6))
# bars = plt.bar(range(len(motif_IDs)), e_values, color=cmap(norm(p_values)), alpha=0.7)

# # 添加标签和标题
# plt.xlabel('Motif ID')
# plt.ylabel('E-value')
# plt.title('Enrichment Analysis Bar Plot')

# # 添加颜色条
# sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
# sm.set_array([])  # 空数组用于添加颜色条
# colorbar = plt.colorbar(sm, label='-log10(p-value)')

# # 添加X轴刻度标签
# plt.xticks(range(len(motif_IDs)), motif_IDs, rotation=90, fontsize=8)

# # 显示柱状图
# plt.tight_layout()
# plt.show()
plt.savefig('/home/ubuntu/server/download/2b4645e5e2df/ame_out/histogram.png', dpi=300, bbox_inches='tight')
