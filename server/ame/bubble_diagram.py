import pandas as pd
import matplotlib.pyplot as plt
import math

# 读取富集分析结果数据
data = pd.read_csv('/home/ubuntu/server/download/2b4645e5e2df/ame_out/ame.tsv', sep='\t')

# 选择需要绘制的数据列，例如p-value、%TP、%FP
p_values = -1 * data['p-value'].apply(lambda x: math.log10(x))  # 对p-value取对数并取负值
percent_TP = data['%TP']
percent_FP = data['%FP']

# 设置气泡图的大小和颜色
bubble_size = 100  # 气泡大小
bubble_color = p_values  # 颜色根据-p值设置，值越小颜色越深

# 创建气泡图
plt.figure(figsize=(10, 6))
plt.scatter(percent_TP, percent_FP, s=bubble_size, c=bubble_color, cmap='viridis', alpha=0.7)

# 添加标签和标题
plt.xlabel('% True Positives')
plt.ylabel('% False Positives')
plt.title('Enrichment Analysis Bubble Plot')

# 添加颜色条
plt.colorbar(label='-log10(p-value)')
plt.savefig('/home/ubuntu/server/download/2b4645e5e2df/ame_out/bubble_plot.png', dpi=300, bbox_inches='tight')
# 显示气泡图
# plt.show()
