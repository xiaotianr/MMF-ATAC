# -*- coding: utf-8 -*-
"""
Created on Thu Oct 24 11:23:00 2019

@author: shuangquanzhang
"""

import numpy as np
import os
from collections import Counter
import argparse
parser = argparse.ArgumentParser(description="Process ATAC-seq data.")
parser.add_argument('--dataset', default='GSE11420x',type=str,help='The prefix name of the dataset')
parser.add_argument('--hash', default='fbd7c1da229c4007bf2d7b8a1ba1cf03',type=str,help='The The hash of the task')
parser.add_argument('--genome', default='hg38',type=str,help='The hash of the task')
args = parser.parse_args()
def read_fa(fa):
    alph='ACGT'
    file=open(fa,'r')
    predata=file.readlines()
    file.close()
    data=[]
    for i in range(len(predata)):
        if i&1==1:
            data.append(predata[i])
    nrow=len(data[1].strip('\n'))
    ncol=len(data)
    matrix=[]
    # print(nrow,ncol,data)
    # return
    for i in range(nrow):
        tt=[t[i] for t in data[:]]
        nums=Counter(tt)
        num=[nums[t] for t in alph]
        matrix.append(num)
    matrix=np.array(matrix)
    alength=len(alph)
    w=nrow
    nsites=ncol
    matrix=np.array(matrix,dtype=np.float32)
    matt=np.zeros_like(matrix)
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            if j<3:
                matt[i,j] = np.around(matrix[i,j]/ncol,20)
            if j==3:
                aa=1-(matt[i,0]+matt[i,1]+matt[i,2])
                matt[i,-1]=aa 
    return matt,alength,w,nsites


def get_meme(fa):
    names=fa.split('.fa')[0].split('/')[-1]
    # print(names)
    name='./download/'+args.hash+'/letter-probability-matrix/'+names+'.meme'
    # print(name)
    # read_fa(fa)
    # return 
    matrix,alength,w,nsites=read_fa(fa)
    matrix=np.around(matrix,6)
    letter = 'letter-probability matrix: alength= '+str(alength)+' w= '+str(w)+' nsites= '+str(nsites)+'\n'
    file = open(name,'w')
    file.writelines('MEME version 4'+'\n')
    file.writelines('ALPHABET= ACGT'+'\n')
    file.writelines('MOTIF '+'motif1'+'\n')
    file.writelines('\n')
    file.writelines(letter)
    s=''
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            s+=str(matrix[i,j])+'\t'
            
        file.writelines(s+'\n')
        s=''
    file.close()
#    return names  
def obtain(path,l):
    
    for i in range(0,l):
        try:
            
            names=path+'/filter_'+str(i)+'.txt'
            get_meme(names)
        except Exception as e:
            pass 
        continue
        
    
if __name__=='__main__':
    name=args.hash
    ppmpath='./download/'+args.hash+'/letter-probability-matrix/'
    if not os.path.exists(ppmpath):
        os.mkdir(ppmpath)
    path='./save/'+name+'/fasta_file/'
    files=os.listdir(path)
    for i in files:
        name=path+i
        # print(name)
        # obtain(name,300)
        get_meme(name)
        # break
        