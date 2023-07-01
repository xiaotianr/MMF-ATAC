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
    motif_database=''
    if database == "hocomoco" or database=="HOCOMOCO":
        if genome=="hg38":
            motif_database="hocomoco_human"
        elif genome=="mm10":
            motif_database="hocomoco_mouse"
    elif database=="JASPAR" or database=="jaspar":
        motif_database="jaspar_vertebrates"
    os.system("nohup rgt-motifanalysis matching --motif-dbs ~/rgtdata/motifs/"+motif_database+" --organism="+genome+" --output-location="+savepath+" --input-files "+inputpath+"/hint_"+name+".bed &")
    print('motifanalysis end')
def main():
    name = sys.argv[1]
    schedule = sys.argv[2]
    species = sys.argv[3]
    database = sys.argv[4]
    genome = 'hg38'
    if species == 'mus':
        genome = 'mm10'
    if schedule == '1':
        run1(name,genome)
    else:
        run2(name,genome,database)

if __name__ == '__main__':
    # print("进程 " +sys.argv[0]+sys.argv[1]+sys.argv[2] +sys.argv[3]+" 执行。")
    main()