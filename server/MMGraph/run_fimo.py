import os
import argparse
parser = argparse.ArgumentParser(description="Process ATAC-seq data.")
parser.add_argument('--dataset', default='GSE11420x',type=str,help='The prefix name of the dataset')
parser.add_argument('--hash', default='fbd7c1da229c4007bf2d7b8a1ba1cf03',type=str,help='The The hash of the task')
parser.add_argument('--genome', default='hg38',type=str,help='The hash of the task')
args = parser.parse_args()
def getfimo(name,genome):
    memes = "./hocomoco_meme"
    if genome=='mm10':
        memes="./hocomoco_meme_mus"
    # test_files = "./download/"+name+"/motifs/"+name+"_encode_merge.fa"
    meme = os.walk(memes)
    # test = os.walk(test_files)
    prefix = "fimo -o ./save/"+name+"/fimo_out/"
    if not os.path.exists("./save/"+name+"/fimo_out/"):
        os.mkdir("./save/"+name+"/fimo_out/")
    input1_list = []
    file_name_list = []
    file_name2=name+"_encode_merge.fa"
    for path,_,file_list in meme:
        for file_name in file_list:
            input1 = os.path.join(path,file_name)
            input1_list.append(input1)
            file_name_list.append(file_name)

    # for path2,_,file_list2 in test:
    #     for i in file_list2:
    #         if i.find(args.dataset)!=-1:
    #             file_name2=i
            # input2 = os.path.join(path2,file_name2)
            # input2_list.append(input2)
            # file_name2_list.append(file_name2)
    # input2 = input2+file_name2
    # print(file_name2,input2)

    for i in range(len(file_name_list)):
        file_name = file_name_list[i]
        input1 = input1_list[i]
        input2 = "./download/"+name+"/motifs/"+file_name2
        cmd = prefix +  file_name[:-5]+" " +input1 +" "+input2
        os.system(cmd)
        target = "./save/"+name+"/fimo_out/"+file_name[:-5]+"/fimo.html"
        f = open(target,"rb").read()
        if b"There were 0 motif occurences with a p-value less than 0.0001." in f:
            os.system("rm -rf "+target[:-10])
        elif b"There were 1 motif occurences with a p-value less" in f:
            os.system("rm -rf "+target[:-10])
        elif b"There were 2 motif occurences with a p-value less" in f:
            os.system("rm -rf "+target[:-10])  
        elif b"There were 3 motif occurences with a p-value less" in f:
            os.system("rm -rf "+target[:-10])  
        elif b"There were 4 motif occurences with a p-value less" in f:
            os.system("rm -rf "+target[:-10])
        elif b"There were 5 motif occurences with a p-value less" in f:
            os.system("rm -rf "+target[:-10])
        


if __name__=='__main__':
    name=args.hash
    genome=args.genome
    print("Fimo Start!")
    getfimo(name,genome)
    print("Fimo Done!")
# file_name = "./save/"+name+"/fasta_file/"
# if not os.path.exists(file_name):
#     os.mkdir(file_name)
# for root in os.listdir("./save/"+name+"/fimo_out"):
#     tmp = root.split("/")
#     # if len(tmp) > 6 and tmp[-1].find(args.dataset)!=-1:
#     target = "./save/"+name+"/fimo_out/"+ root + "/fimo.gff"
#     out = open(target,"r").readlines()[1:]
#     data = ""
#     for line in out:
#         seq = line.split("\t")[0]
#         res = line.split("\t")[-1].split(";")[-2].split("=")[-1]
#         data += ">"+seq+"\n"+res+"\n"
#     f = open(file_name + tmp[-1] + ".fa", "w")
#     f.write(data)
#     f.close()