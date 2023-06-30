---
html:
  	toc: true
print_background: true
---
## Introduction
#### 1.What is MMGraph-WS?
MMGraph-WS is a web server that provides sequence classification and motifs finding from our developed a homonymous motif prediction tool. This tool is based on three-layer GNN and coexisting probability of k-mers to find multiple motifs from ATAC-seq data. The performance of this tool was evaluated on the 88 ENCODE ATAC-seq datasets and achieved the best performance on area of eight metrics radar score of 2.31 and could find 207 higher-quality multiple motifs than other existing tools.  Our Server also provides the function of motif visualization.


#### 2.What is ATAC-seq?
ATAC-seq is used for investigating the chromatin accessibility of the entire genome and generates DNA fragments suitable for sequencing by inserting the Tn5 transposase into open chromatin regions ([Louise, S. et al, Biochemical Society Transactions, 2022](https://doi.org/10.1042/BST20210834)). When a TF binds to DNA, it blocks the Tn5 transposase from cutting the DNA sequence in that specific region, resulting in a protected area known as an ATAC-seq footprint ([Doganli, C. et al, Eukaryotic Transcriptional and Post-Transcriptional Gene Expression Regulation, 2017](https://doi.org/10.1007/978-1-4939-6518-2_5)). By detecting these footprints, multiple regions where TFs are bound to the genome can be identified, all from one ATAC-seq experiment. Compared with other techniques such as ChIP-seq and Dnase-seq, ATAC-seq can obtain all open regions of the genome and is more efficient in identifying TFBSs. 

#### 3.What is TFBS and motif?
Transcription factors (TFs) bind to specific DNA sequences called transcription factor binding sites (TFBSs), which are involved in the gene transcription ([Zhang, Q. et al, PLoS computational biology, 2022](https://doi.org/10.1371/journal.pcbi.1009941)). TFBSs are typically short, ranging from 6 to 20 base pairs in length, and are specifically recognized by certain transcription factors ([Chen, H. et al, Scientific reports, 2015](https://doi.org/10.1038/srep08465)). The TFBSs of a TF are conserved at the sequence level, which is referred to as a motif ([Zhang, S. et al, Briefings in Bioinformatics, 2022](https://doi.org/10.1093/bib/bbab374)). Motif finding aims to find some short and conserved TFBSs from high-throughput sequencing data such as Chromatin immunoprecipitation followed by sequencing (ChIP-seq), ATAC-seq, and DNase I hypersensitive sites sequencing (Dnase-seq).

## Tutorial
![](../../src/images/Server%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)
### Input files
The following input files are required. These files contain ATAC-seq data from ENCODE, which is essential for the processing and analysis of the data.

#### 1.ATAC-seq bed narrowPeak file (required)
This file contains the ATAC-seq data in the BED narrowPeak format. The narrowPeak format is a specialized version of the BED format designed to display the locations and scores of experimentally determined transcription factor binding sites. In the context of ATAC-seq data, this file provides the locations of accessible chromatin regions in the genome.
#### 2.ATAC-seq bam file (required)
The ATAC-seq bam file contains the aligned sequencing reads from the ATAC-seq experiment in the BAM (Binary Alignment/Map) format. This format is a binary representation of the Sequence Alignment/Map (SAM) format, which stores large nucleotide sequence alignments. The ATAC-seq bam file is essential for downstream analyses, including peak calling, data visualization, and data interpretation.
### Parameters select
#### 1.Tool
Choose the tool you want to use for your analysis: MMGraph, HINT-ATAC, or TOBIAS. Note that MMGraph can identify unknown motifs, while HINT-ATAC and TOBIAS excel at motif scanning based on known databases.

#### 2.Species assembly
Select the appropriate species assembly for your data.

#### 3.Submit task
Choose the desired task, such as TFBS prediction or multiple motif finding, and submit it by clicking 'Run.'

#### 4.Select Motif database (optional)
Optionally, select a motif database for comparison or validation of the identified motifs.

#### 5.E-mail (optional)
Provide an email address to receive the results via email without any waiting time on the current page.


### Output results
#### 1.Task:TFBSs prediction
For TFBS prediction tasks, users will receive the AEMR score and P-value of MMGraph.

#### 2.Task:Multiple motifs finding
Selecting multiple motif finding tasks will provide users with a variety of TFBS sequences of different lengths that MMGraph has found in the ATAC-seq data.

#### 3.Task:Motif database comparison
If a motif database is selected, the server will provide a comparison of the identified motifs with known motifs in the chosen database.

#### 4.How to get result?
Once the progress bar is complete, users can download the experimental results from the current page. If an email address was provided, the server will send the results via email, eliminating any waiting time on the current page.


### Dataset table and search functionality
We have provided a comprehensive table that contains motif results for 370 human ATAC-seq datasets and 81 mouse ATAC-seq datasets identified by MMGraph, along with data sources for each dataset. This makes it easy to find related information and download the corresponding data from the ENCODE website. To further aid researchers in their work, we have included brief information and motif logos on our server.

#### 1. Precise query function

MMGraphWS provides a precise query function for retrieving relevant information about corresponding ATAC-seq data by entering a GEO number. This feature ensures that users can easily locate specific datasets of interest.

#### 2. Fuzzy search

For more general results, users can also perform a fuzzy search by entering one or more keywords. This search option is particularly useful for users who may not have a specific GEO number but still want to explore related datasets.

#### 3. Search options

Both the precise query function and fuzzy search are available to facilitate the quick and accurate retrieval of desired information. This flexibility allows users to easily find the most relevant data for their research needs.

### Using the table and search functionality
To utilize the dataset table and search features, follow these steps:

1. Navigate to the dataset table on Browse.
2. For a precise query, enter the GEO number in the search box.
3. For a fuzzy search, enter one or more keywords in the search box.
4. Review the search results, which will display relevant datasets along with their motifs, data sources, and additional information.
5. To access the corresponding data on the ENCODE website, click on the appropriate link provided in the search results.
