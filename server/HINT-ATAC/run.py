import os
import sys,json

def run1(name,genome):
    bedname = './upload/'+name+'/'+name+'.bed'  
    bamname = './upload/'+name+'/'+name+'.bam'
    savepath = './save/'+name
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    print('hint begin')
    os.system("nohup rgt-hint footprinting --atac-seq --paired-end --organism="+genome+" --output-location="+savepath+" --output-prefix=hint_"+name+" "+bamname+" "+bedname +" &")
    print('hint end')

def run2(name,genome,database):
    inputpath='./save/'+name
    savepath = './download/'+name
    print('motifanalysis begin')
    cmd = 'bedtools getfasta -fi ./genome/'+genome+'.fa -bed '+inputpath+"/hint_"+name+".bed  -fo "+inputpath+"/"+name+".fa"
    os.system(cmd)
    motif_database=''
    if database == "hocomoco" or database=="HOCOMOCO":
        if genome=="hg38" or genome=="hg19":
            motif_database="hocomoco_human"
        elif genome=="mm10" or genome=="mm10":
            motif_database="hocomoco_mouse"
    elif database=="JASPAR" or database=="jaspar":
        motif_database="jaspar_vertebrates"
    os.system("nohup rgt-motifanalysis matching --motif-dbs ~/rgtdata/motifs/"+motif_database+" --organism="+genome+" --output-location="+savepath+" --input-files "+inputpath+"/hint_"+name+".bed &")
    memes = "./hocomoco_meme"
    if genome=='mm10'or genome=="mm10":
        memes="./hocomoco_meme_mus"
     meme = os.walk(memes)
    prefix = "fimo -o ./download/"+name+"/fimo_out/"
    if not os.path.exists("./download/"+name+"/fimo_out/"):
        os.mkdir("./download/"+name+"/fimo_out/")
    input1_list = []
    file_name_list = []
    file_name2=name+".fa"
    for path,_,file_list in meme:
        for file_name in file_list:
            input1 = os.path.join(path,file_name)
            input1_list.append(input1)
            file_name_list.append(file_name)
    for i in range(len(file_name_list)):
        file_name = file_name_list[i]
        input1 = input1_list[i]
        input2 = "./save/"+name+"/"+file_name2
        cmd = prefix +  file_name[:-5]+" " +input1 +" "+input2
        os.system(cmd)
        target = "./download/"+name+"/fimo_out/"+file_name[:-5]+"/fimo.html"
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

    print('motifanalysis end')
def main():
    name = sys.argv[1]
    schedule = sys.argv[2]
    species = sys.argv[3]
    database = sys.argv[4]
    genome = 'hg38'
    if species == 'mus':
        genome = 'mm10'
    elif species == 'homo_hg19':
        genome='hg19'
    elif species == 'mus_mm9':
        genome=='mm9'
    elif species == 'danio_zv10':
        genome='zv10'
    elif species == 'danio_zv10':
        genome=='zv9'
    if schedule == '1':
        run1(name,genome)
    else:
        run2(name,genome,database)

if __name__ == '__main__':
    # print("进程 " +sys.argv[0]+sys.argv[1]+sys.argv[2] +sys.argv[3]+" 执行。")
    main()