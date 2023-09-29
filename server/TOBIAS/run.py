import os
import sys,json
import pyBigWig
import shutil

def regularize(score):
    final_score=float(int(score*100)/100)
    return final_score

def run1(name,genome):
    bedname = './upload/'+name+'/'+name+'.bed'  
    bamname = './upload/'+name+'/'+name+'.bam'
    savepath = './save/'+name
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    tobias_atac_path = savepath + "/tobias_atac" # path/tobias_atac
    if not os.path.exists(tobias_atac_path):
        os.mkdir(tobias_atac_path)
    print('TOBIAS begin')
    os.system("TOBIAS ATACorrect --bam "+bamname+" --genome ./genome/"+genome+".fa --peaks "+bedname+" --outdir "+tobias_atac_path+" --cores 8 >> ./tobias.out")
    tobias_footprint_bw_path=savepath+"/tobias_footprint_bw" 
    if not os.path.exists(tobias_footprint_bw_path):
        os.mkdir(tobias_footprint_bw_path)
    tobias_footprint_bw_name=tobias_footprint_bw_path+"/"+name+"_printscore.bw"
    os.system("TOBIAS ScoreBigwig --signal "+tobias_atac_path+"/"+name+"_corrected.bw --regions "+bedname+"  -o "+tobias_footprint_bw_name+" --cores 8 >> ./tobias.out")

    bw = pyBigWig.open(tobias_footprint_bw_name)  
    tobias_bed_name=savepath+"/"+name+"_tobias_footprint.bed"
    of = open(tobias_bed_name, "w")
    startPos=0
    endPos=0
    for chrom, length in bw.chroms().items():
        intervals = bw.intervals(chrom)
        if intervals!=None:
            startChr=intervals[0]
            startChr_score=regularize(startChr[2])
            for interval in intervals:
              interval_score=regularize(interval[2])
              if interval_score!=startChr_score:
                startPos=startChr[0]
                endPos=interval[0]
                point=startChr_score
                of.write("{}\t{}\t{}\t{}\n".format(chrom, startPos, endPos,point))
                startChr=interval
                startChr_score  =regularize(startChr[2])
    bw.close()
    of.close()
    # if os.path.exists(savepath+"/tobias_atac"):
    #     shutil.rmtree(savepath+"/tobias_atac")
    # if os.path.exists(savepath+"/tobias_footprint_bw"):
    #     shutil.rmtree(savepath+"/tobias_footprint_bw")
    tobias_top1500_bed_name = savepath + '/' + name + '_tobias.bed'  # path/tobias_top1500_bed/top1500GSE.bed
    nfile = open(tobias_top1500_bed_name, 'w')
    file = open(tobias_bed_name,"r")
    da = file.readlines()
    file.close()
    list1 = []
    t = 0
    j=0
    while j<1500:
        d1 = da[j + t].strip().split('\t')
        if int(d1[2]) - int(d1[1]) > 3:
            tup = (da[j],float(d1[-1]))
            list1.append(tup)
            j+=1
        else :
            t+=1
    list1 = sorted(list1, key=lambda tup:tup[1])[::-1]
    length = len(da)
    for i in range(1500 + t,length):
        d1 = da[i].strip().split('\t')
        if int(d1[2]) - int(d1[1]) > 3:
            tup = (da[i],float(d1[-1]))
            minn_score = list1[-1][1]
            if tup[1] > minn_score:
                list1.pop()
                list1.append(tup)
                list1 = sorted(list1, key=lambda tup:tup[1])[::-1]
        else:
            i -= 1
    for i in list1:
        nfile.write(i[0])
    nfile.close()
    print('TOBIAS end')

def run2(name,genome,database):
    inputpath='./save/'+name
    savepath = './download/'+name
    if not os.path.exists(savepath):
        os.mkdir(savepath)
    print('motifanalysis begin')
    if database == "hocomoco" or database=="HOCOMOCO":
        if genome=="hg38" or genome=="hg19":
            motif_database="./motif_database/hocomoco/HOCOMOCOv11_core_HUMAN_mono_jaspar_format.txt"
        elif genome=="mm10" or genome=="mm10":
            motif_database="./motif_database/hocomoco/HOCOMOCOv11_core_MOUSE_mono_jaspar_format.txt"
    elif database=="JASPAR" or database=="jaspar":
        motif_database="./motif_database/jaspar/JASPAR2022_CORE_vertebrates_non-redundant_pfms_jaspar.txt"
    tobias_footprint_bw_name='./save/'+name+"/tobias_footprint_bw/"+name+"_printscore.bw"
    tobias_bed_name='./save/'+name+"/"+name+"_tobias.bed"
    motifpath=savepath+"/motif"
    if not os.path.exists(motifpath):
        os.mkdir(motifpath)
    os.system("TOBIAS BINDetect --signal "+tobias_footprint_bw_name+" --motifs "+motif_database+" --genome ./genome/"+genome+".fa --peaks "+tobias_bed_name+" --outdir "+motifpath+" --cores 8 >> ./tobias.out")

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
    main()