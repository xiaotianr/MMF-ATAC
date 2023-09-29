import os
import sys,json
# import argparse

# parser = argparse.ArgumentParser(description="Process some integers.")
# parser.add_argument('--bed', default='GSE11420x',type=str,help='The name of the bed file')
# parser.add_argument('--path', default='../upload/GSE170918_printscore.bed',type=str,help='Path to the bed file') 
# args = parser.parse_args()

def run1(name,genome):
    cmd = 'nohup python ./MMGraph/detect_footprints.py --hash '+name+' --genome '+genome+' &'
    # cmd = 'python ./MMGraph/detect_footprints.py --hash '+name+' --genome '+genome
    print(cmd)
    os.system(cmd)

def run2(name,genome):
    cmd = 'nohup python ./MMGraph/get_S.py --hash '+name+' --genome '+genome+' &'
    # cmd = 'python ./MMGraph/get_S.py --hash '+name+' --genome '+genome
    print(cmd)
    os.system(cmd)

def run3(name):
    cmd ='nohup python ./MMGraph/train.py --hash '+name+' &'
    # cmd ='python ./MMGraph/train.py --hash '+name
    print(cmd)
    os.system(cmd)

def run4(name):
    cmd='nohup python ./MMGraph/com_multi.py --hash ' +name+' &'
    print(cmd)
    os.system(cmd)    

def run5(name,genome):
    # cmd = 'nohup python ./MMGraph/find_multiple_tfbs.py --hash '+name+' &'
    cmd = 'python ./MMGraph/find_multiple_tfbs.py --hash '+name
    print(cmd)
    os.system(cmd)
   

def run6(name,genome):
    cmd = 'python ./MMGraph/run_fimo.py --hash '+name+' --genome '+genome
    print(cmd)
    os.system(cmd)
    cmd2 = 'python ./MMGraph/get_fasta.py --hash '+name
    print(cmd2)
    os.system(cmd2)
    cmd3 = 'python ./MMGraph/compute_meme.py --hash '+name
    print(cmd3)
    os.system(cmd3)
    cmd4='python ./MMGraph/gettomtom.py --hash '+name+' --genome '+genome
    print(cmd4)
    os.system(cmd4)
    cmd5 = 'python ./MMGraph/getimg.py --hash '+name
    print(cmd5)
    os.system(cmd5)

def main():
    name = sys.argv[1]
    schedule = sys.argv[2]
    species = sys.argv[3]
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
    elif schedule == '2':
        run2(name,genome)
    elif schedule == '3':
        run3(name)
    elif schedule == '4':
        run4(name)
    elif schedule == '5':
        run5(name,genome)
    else:
        run6(name,genome)

if __name__ == '__main__':
    # print("进程 " +sys.argv[0]+sys.argv[1]+sys.argv[2] +" 执行。")
    # print(os.getcwd())
    main()
    # test(args)