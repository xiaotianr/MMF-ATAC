import os
import argparse
parser = argparse.ArgumentParser(description="Process ATAC-seq data.")
parser.add_argument('--dataset', default='GSE11420x',type=str,help='The prefix name of the dataset')
parser.add_argument('--hash', default='fbd7c1da229c4007bf2d7b8a1ba1cf03',type=str,help='The The hash of the task')
parser.add_argument('--genome', default='hg38',type=str,help='The hash of the task')
args = parser.parse_args()

def getfasta(name,genome):
    file_name = "./save/"+name+"/fasta_file/"
    if not os.path.exists(file_name):
        os.mkdir(file_name)
    for root in os.listdir("./save/"+name+"/fimo_out"):
        tmp = root.split("/")
        target = "./save/"+name+"/fimo_out/"+ root + "/fimo.gff"
        out = open(target,"r").readlines()[1:]
        data = ""
        for line in out:
            seq = line.split("\t")[0]
            res = line.split("\t")[-1].split(";")[-2].split("=")[-1]
            data += ">"+seq+"\n"+res+"\n"
        f = open(file_name + tmp[-1] + ".fa", "w")
        f.write(data)
        f.close()

if __name__=='__main__':
    name=args.hash
    genome=args.genome
    getfasta(name,genome)