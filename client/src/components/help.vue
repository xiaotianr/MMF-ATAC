<template>
  <div id="help" for="html-export" html-show-sidebar-toc="true">
    <div class="mume markdown-preview">
      <!-- <button type="button" class="back"><a href="/" class="back-a" style="color: #fff;">Back to Home
                    Page</a></button> -->
      <h2 class="mume-header" id="introduction">Introduction</h2>

      <h4 class="mume-header" id="1what-is-mmf-atac">1.What is MMF-ATAC?</h4>

      <p>
        Motif finding in Assay for Transposase-Accessible Chromatin using sequencing (ATAC-seq) data
        is crucial for understanding Transcription Factor Binding Sites (TFBSs) and
        their roles in gene regulation. To facilitate this process for experimental biologists,
        MMF-ATAC has been developed as a user-friendly web server that enables efficient f
        inding multiple motifs in ATAC-seq data using a graph neural network-based tool.
        The web server is designed with a focus on usability and provides several key features,
        including ATAC-seq data querying, TFBSs prediction and motif finding job submission.
        Moreover, MMF-ATAC provides motif finding results and visualizations of 459 ENCODE ATAC-seq datasets.
        Overall, MMF-ATAC serves as a valuable resource for experimental biologists
        seeking a user-friendly tool to find motif from ATAC-seq data without the need for programming expertise.
      </p>
      <h4 class="mume-header" id="2what-is-mmgraph">2.What is MMGraph?</h4>

      <p>
        MMGraph (<a href="https://doi.org/10.1093/bioinformatics/btac572">Zhang, S. et al, Bioinformatics, 2022</a>)
        comprises three main components: a heterogeneous graph, a three-layer GNN model
        to obtain embeddings of k-mers and sequences, and a coexisting probability
        calculation for finding multiple motifs. The heterogeneous graph consists of three
        edge types: similarity edges, coexisting edges, and inclusive edges.
      </p>
      <p>These edges are calculated using different formulas:</p>
      <p>
        Similarity edges use the Hamming distance to measure mismatch between k-mer nodes:
        <math-formula formula="$$w_{sim}(p,q) = w_{sim}(q,p) = \textrm{Hamming}(k(p), k(q))$$"
          class="flex items-center justify-center"></math-formula>
      </p>
      <p>
        Coexisting edges measure the coexisting probability between k-mer nodes using a
        log-odds ratio:
        <math-formula
          formula="$$w_{co}(p,q) = w_{co}(q,p) = -\log\left(\frac{Q(k(p),k(q))}{P(k(p)) \times P(k(q))}\right)$$"
          class="flex items-center justify-center"></math-formula>
        where
        <math-formula
          formula="$$P(k(p)) = \frac{\textrm{num}(k(p))}{n},Q(k(p),k(q)) = \frac{\textrm{nums}(k(p),k(q))}{n}$$"
          class="flex items-center justify-center"></math-formula>
      </p>
      <p>
        Inclusive edges transfer the concept of term frequency-inverse document frequency
        (TF-IDF) to measure the dependency degree between k-mers and sequences:
        <math-formula
          formula="$$w_{inclu}(p,i) = \textrm{tf}(k(p),s(i)) \times \log\left(\frac{n}{\textrm{num}(k(p))}\right)$$"
          class="flex items-center justify-center"></math-formula>
      </p>
      <p>
        By constructing the heterogeneous graph and using the GNN model, MMGraph is able
        to learn the relationships and dependencies between k-mers and sequences. After
        obtaining the embeddings, multiple motifs can be found using mutual information
        and other criteria.
      </p>
      <h4 class="mume-header" id="3what-is-atac-seq">3.What is ATAC-seq?</h4>

      <p>
        ATAC-seq is used for investigating the chromatin accessibility of the entire
        genome and generates DNA fragments suitable for sequencing by inserting the Tn5
        transposase into open chromatin regions (<a href="https://doi.org/10.1042/BST20210834">Louise, S. et al,
          Biochemical Society Transactions, 2022</a>). When a TF binds to DNA, it blocks the Tn5 transposase from cutting
        the DNA
        sequence in that specific region, resulting in a protected area known as an
        ATAC-seq footprint (<a href="https://doi.org/10.1007/978-1-4939-6518-2_5">Doganli, C. et al, Eukaryotic
          Transcriptional and Post-Transcriptional Gene
          Expression Regulation, 2017</a>). By detecting these footprints, multiple regions where TFs are bound to the
        genome can be identified, all from one ATAC-seq experiment. Compared with other
        techniques such as ChIP-seq and Dnase-seq, ATAC-seq can obtain all open regions of
        the genome and is more efficient in identifying TFBSs.
      </p>
      <h4 class="mume-header" id="4what-is-tfbs-and-motif">4.What is TFBS and motif?</h4>

      <p>
        Transcription factors (TFs) bind to specific DNA sequences called transcription
        factor binding sites (TFBSs), which are involved in the gene transcription (<a
          href="https://doi.org/10.1371/journal.pcbi.1009941">Zhang, Q. et al, PLoS computational biology, 2022</a>).
        TFBSs are typically short, ranging from 6 to 20 base pairs in length, and are
        specifically recognized by certain transcription factors (<a href="https://doi.org/10.1038/srep08465">Chen, H. et
          al, Scientific reports, 2015</a>). The TFBSs of a TF are conserved at the sequence level, which is referred to
        as
        a motif (<a href="https://doi.org/10.1093/bib/bbab374">Zhang, S. et al, Briefings in Bioinformatics, 2022</a>).
        Motif finding aims to find some short and conserved TFBSs from high-throughput
        sequencing data such as Chromatin immunoprecipitation followed by sequencing
        (ChIP-seq), ATAC-seq, and DNase I hypersensitive sites sequencing (Dnase-seq).
      </p>

      <h2 class="mume-header" id="instructions">Instructions</h2>

      <p class="flex items-center justify-center">
        <img src="../../src/images/Server_flow_chat.png" width="60%" />
      </p>

      <h3 class="mume-header" id="input-files">Inputs</h3>
      <p class="flex items-center justify-center">
        <img src="/images/upload.png" width="45%" />
        <img src="/images/upload2.png" width="45%" />
      </p>
      <p>
        The following input files are required. These files contain ATAC-seq data from
        ENCODE, which is essential for the processing and analysis of the data.
      </p>
      <h4 class="mume-header" id="1atac-seq-bed-narrowpeak-file-required">
        1.ATAC-seq peak file (required)
      </h4>
      <p>
        The peak file should contain at least 3 columns,
        with the first column representing the chromosome name,
        the second column representing the start position of the region,
        and the third column representing the end position of the region.
      </p>
      <p>
        This peak file we recommended contains the ATAC-seq data in the BED narrowPeak format. The narrowPeak
        format is a specialized version of the BED format designed to display the
        locations and scores of experimentally determined transcription factor binding
        sites. In the context of ATAC-seq data, this file provides the locations of
        accessible chromatin regions in the genome.
        <a href="https://www.encodeproject.org/files/ENCFF770QET/@@download/ENCFF770QET.bed.gz">Click this link to
          download and view a sample ATAC-seq peak file</a>
      </p>
      <!-- <p>
        Here is an example of a bed narrowPeak input file, where the first column represents the chromosome name or identity, the second column represents the start position of the peak, the third column represents the end position of the peak, the fourth column represents the name or identity of the peak, the fifth column represents the quality score of the peak for the intensity of the peak, and the sixth column represents the direction of the peak. The seventh column represents the relative signal intensity of the peak, the eighth column represents the corrected p-value, the ninth column represents the corrected q-value, and the tenth column represents the distance of the peak from the starting position.
      </p>
      <el-table :data="bedtable" style="width: 100%">
        <el-table-column label="chrom" prop="chrom" header-align="center" align="center"></el-table-column>
        <el-table-column label="chromStart" prop="start" width="120" header-align="center" align="center"></el-table-column>
        <el-table-column label="chromEnd" prop="end" width="120" header-align="center" align="center"></el-table-column>
        <el-table-column label="name" prop="name" header-align="center" align="center"></el-table-column>
        <el-table-column label="score" prop="score" header-align="center" align="center"></el-table-column>
        <el-table-column label="strand" prop="strand" header-align="center" align="center"></el-table-column>
        <el-table-column label="signal value" prop="signalvalue" width="150" header-align="center" align="center"></el-table-column>
        <el-table-column label="-log10(pvalue)" prop="pvalue" width="150" header-align="center" align="center"></el-table-column>
        <el-table-column label="-log10(qvalue)" prop="qvalue" width="150" header-align="center" align="center"></el-table-column>
        <el-table-column label="peak" prop="peak" header-align="center" align="center"></el-table-column>
      </el-table> -->
      <h4 class="mume-header" id="2atac-seq-bam-file-required">
        2.ATAC-seq bam file (required)
      </h4>
      <p>
        The ATAC-seq bam file contains the aligned sequencing reads from the ATAC-seq
        experiment in the BAM (Binary Alignment/Map) format. This format is a binary
        representation of the Sequence Alignment/Map (SAM) format, which stores large
        nucleotide sequence alignments. The ATAC-seq bam file is essential for downstream
        analyses, including peak calling, data visualization, and data interpretation.
        <a href="https://www.encodeproject.org/files/ENCFF240QKT/@@download/ENCFF240QKT.bam">
          Click this link to download and view a sample ATAC-seq bam file</a>
      </p>
      <h3 class="mume-header" id="parameters-select">Parameters setting</h3>

      <h4 class="mume-header" id="1tool">1.Tools</h4>
      <p>
        Choose the tool you want to use for your analysis: MMGraph, HINT-ATAC (<a
          href="https://doi.org/10.1186/s13059-019-1642-2">Li, Z. et al, Genome biology, 2017</a>), or TOBIAS (<a
          href="https://doi.org/10.1038/s41467-020-18035-1">Bentsen, M. et al, Nature communications, 2020</a>). Note that
        MMGraph can identify unknown motifs, while HINT-ATAC and TOBIAS
        excel at motif scanning based on known databases.
      </p>
      <h4 class="mume-header" id="2species-assembly">2.Species assembly</h4>
      <p>
        Select the appropriate species assembly for your data. When selecting a species,
        different organisms will be used for analysis depending on the chosen species.
        Therefore, please make sure to select the correct species corresponding to the
        uploaded ATAC-seq data. We mainly support human and mouse species,
        although we also open danio rerio as an extension option,
        but there is not as much experimental support as human and mouse.
      </p>
      <h4 class="mume-header" id="3submit-task">3.Tasks</h4>
      <p>
        Depending on the selected tool, different analytical tasks will be performed. When
        MMGraph is chosen as the tool, the tasks executed include TFBSs prediction and
        multiple motifs finding. Conversely, when either HINT-ATAC or TOBIAS is selected,
        the tasks carried out involve TFBSs prediction and motif database comparison.
      </p>
      <h4 class="mume-header" id="4select-motif-database">
        4.Select Motif database (optional)
      </h4>
      <p>
        When selecting HINT-ATAC or TOBIAS as tool, the motif database comparison task
        will be executed. At this point, it is necessary to choose either HOCOMOCO or
        JASPAR as the database for scanning.
      </p>
      <h4 class="mume-header" id="5e-mail">5.E-mail (optional)</h4>
      <p>
        Provide an email address to receive the results via email without any waiting time
        on the current page.
      </p>
      <h4 class="mume-header" id="6time">6.Running time</h4>
      <p>
        The following are the expected running times for some samples.
        If you don't want to wait on the submission page,
        it is recommended to fill in the email and just wait for the results to be sent to the email
      </p>
      <el-table :data="RunningTime" style="width: 100%">
        <el-table-column label="Sample Number" prop="sampleNumber" width="150"></el-table-column>
        <el-table-column label="GEO Number" prop="geoNumber" width="150"></el-table-column>
        <el-table-column label="Bed NarrowPeak File Size" prop="bedSize" width="230"></el-table-column>
        <el-table-column label="Bam File Size" prop="bamSize" width="150"></el-table-column>
        <el-table-column label="Expected Running Times" prop="expectedTime"></el-table-column>
      </el-table>

      <h3 class="mume-header" id="output-results">Outputs</h3>
      <p class="flex items-center justify-center">
        <img src="/images/download.png" width="45%" />
        <img src="/images/result.png" width="45%" />
      </p>
      <h4 class="mume-header" id="1tasktfbss-prediction">1.MMGraph</h4>
      <p>
        The output results of MMGraph consist of a compressed file, which includes a
        subfolder named 'motifs' and an Excel spreadsheet. The Excel spreadsheet records
        the Area of Eight Metrics Radar (AEMR) for the TFBS predictions made by MMGraph on
        the input ATAC-seq data. The AEMR is used to evaluate the tool's capability in
        identifying whether the sequence contains TFBSs, and encompasses precision,
        recall, F1_score, accuracy (ACC), specificity, Matthews correlation coefficient
        (MCC), the area under the receiver operating characteristic (ROC) curve (AUC), and
        the area under the precision-recall curve (PRC) (<a href="https://doi.org/10.1093/bib/bbab374">Zhang, S. et al,
          Briefings in Bioinformatics, 2022</a>). The 'motifs' subfolder contains
        all the TFBSs found by MMGraph within the input ATAC-seq data.
        The Fimo (<a href="https://doi.org/10.1093/bioinformatics/btr064">Grant, C. et al, Bioinformatics, 2011</a>) tool
        then scans the found TFBSs for individual matches for each motif,
        Finally, all motifs were integrated in the corresponding folders in the formats of fasta,
        motif logo and Letter-probability matrix, respectively.
        The tomtom (<a href="https://doi.org/10.1186/gb-2007-8-2-r24">Gupta, S. et al, Genome Biol, 2007</a>) tool was
        then used to calculate the p-value value
        by comparing the found motifs with the hocomoco motif database.
        A smaller p-value value indicated a more conservative motif found,
        and the comparison results were saved in the 'tomtom-out' folder.
        <a href="#" @click="motif_click">
          Example Results Download
        </a>
      </p>

      <h4 class="mume-header" id="2taskmultiple-motifs-finding">2.HINT-ATAC</h4>
      <p>
        The output of HINT-ATAC is a BED file containing the coordinates and related
        information of the footprint. Each line
        represents a TFBS and includes the chromosome, start position, end position, motif
        name (transcription factor name), score (indicating the binding strength with a
        range from 0 to 1000), and strand (either the positive strand "+" or the negative
        strand "-").
      </p>
      <h4 class="mume-header" id="3taskmotif-database-comparison">3.TOBIAS</h4>
      <p>
        The output of Tobias is a folder named 'motifs'. For each motif in the motif
        database, there will be a subdirectory containing the scanning results for that
        specific motif. Within each transcription factor's (TF) subfolder, there is an
        overview of all TFBSs for that TF in the ATAC-seq dataset. The overview is
        available in both .txt (tab-delimited) and .xlsx formats for easy filtering,
        sorting, and other operations. The 'beds' subdirectory contains bed files for all
        sites, as well as bound and unbound splits for each condition. The '_all' file
        contains all scores, while the bound and unbound files contain only the scores for
        the corresponding condition in the last column.
      </p>
      <h4 class="mume-header" id="4how-to-get-result">4.How to get result?</h4>
      <p>
        Once the progress bar is complete, users can download the experimental results
        from the current page. If an email address was provided, the server will send the
        results via email, eliminating any waiting time on the current page.
      </p>



      <h3 class="mume-header" id="motif-enrichment-analysis">Motif Enrichment Analysis</h3>
      <p>
        Motif Enrichment Analysis seeks to determine which DNA-binding transcription factors
        control the transcription of a set of genes by detecting enrichment of
        known binding motifs in the genes' regulatory regions (<a href="https://doi.org/10.1186/1471-2105-11-165">McLeay,
          R. et al, BMC Bioinformatics, 2010</a>).
      </p>
      <h4 class="mume-header" id="1tool_enrich">1.Tool</h4>
      <p>
        AME (Analysis of Motif Enrichment) scores a set of sequences with a motif,
        treating each subsequence (and its reverse complement for complementable alphabets)
        in the sequence as a possible match to the motif (<a href="https://doi.org/10.1186/1471-2105-11-165">McLeay, R. et
          al, BMC Bioinformatics, 2010</a>). At present, only AME is supported for motif enrichment analysis,
        and motif enrichment analysis tools will be gradually expanded in the future.
      </p>
      <h4 class="mume-header" id="2species_enrich">2.Species</h4>
      <p>
        Select the appropriate species assembly for your data. When selecting a species,
        different organisms will be used for analysis depending on the chosen species.
        Therefore, please make sure to select the correct species corresponding to the
        uploaded data. We mainly support human and mouse species,
        although we also open danio rerio as an extension option,
        but there is not as much experimental support as human and mouse.
      </p>
      <h4 class="mume-header" id="3input-file_enrich">3.Input</h4>
      <p>
        Input the sequences in which you want to find enriched motifs.
        Input files are currently only supported in fasta format.
        It is recommended to use as input the TFBSs found by MMGraph
        in the TFBS prediction and motif finding tasks,
        whose location is under the 'motifs' subfolder.
      </p>
      <h4 class="mume-header" id="4output-results_enrich">4.Outputs</h4>
      <p>
        In all output files, only results for significantly enriched motifs are reported.
        The format of output results refer to <a href="https://meme-suite.org/meme/doc/ame-output-format.html">AME output
          format.</a><a href="#" @click="ame_click">
          Example Results Download
        </a>
      </p>
      <button>
      </button>



      <h3 class="mume-header" id="motif-function-analysis">Genome Ontology Enrichment Analysis</h3>
      <h4 class="mume-header" id="1tool_func">1.Tool</h4>
      <p>
        GOMo (Gene Ontology for Motifs) scans all promoters using nucleotide motifs you provide to determine
        if any motif is significantly associated with genes linked to one or more Genome Ontology (GO) terms.
        The significant GO terms can suggest the biological roles of the motifs. (<a
          href="https://doi.org/10.1093/bioinformatics/btq049">Buske, F. et al,Bioinformatics, 2010</a>).
      </p>
      <h4 class="mume-header" id="2species_func">2.Species</h4>
      <p>
        Select the appropriate species assembly for your data. When selecting a species,
        different organisms will be used for analysis depending on the chosen species.
        Therefore, please make sure to select the correct species corresponding to the
        uploaded data. We mainly support human and mouse species,
        although we also open danio rerio as an extension option,
        but there is not as much experimental support as human and mouse.
        At present, only AME is supported for motif function analysis,
        and motif enrichment analysis tools will be gradually expanded in the future.
      </p>
      <h4 class="mume-header" id="3input-file_func">3.Input</h4>
      <p>
        Input nucleotide motifs to analyze for association with GO terms.
        Input files are currently only supported in meme format.
        It is recommended to use as input the motifs found by MMGraph
        in the TFBS prediction and motif finding tasks,
        whose location is under the 'letter-probability-matrix' subfolder.
      </p>
      <h4 class="mume-header" id="4output-results_func">4.Outputs</h4>
      <p>
        The format of output results refer to
        <a href="https://meme-suite.org/meme/doc/gomo-output-format.html">GOMo output format.</a><a href="#" @click="gomo_click">
          Example Results Download
        </a>
      </p>

      <h3 class="mume-header" id="dataset-table-and-search-functionality">
        Dataset table and search functionality
      </h3>

      <p>
        We have provided a comprehensive table that contains motif results for 370 human
        ATAC-seq datasets and 81 mouse ATAC-seq datasets identified by MMGraph, along with
        data sources for each dataset. This makes it easy to find related information and
        download the corresponding data from the ENCODE website. To further aid
        researchers in their work, we have included brief information and motif logos on
        our server.
      </p>
      <h4 class="mume-header" id="1-precise-query-function">1. Precise query function</h4>

      <p>
        MMF-ATAC provides a precise query function for retrieving relevant information
        about corresponding ATAC-seq data by entering a GEO number. This feature ensures
        that users can easily locate specific datasets of interest.
      </p>
      <h4 class="mume-header" id="2-fuzzy-search">2. Fuzzy search</h4>

      <p>
        For more general results, users can also perform a fuzzy search by entering one or
        more keywords. This search option is particularly useful for users who may not
        have a specific GEO number but still want to explore related datasets.
      </p>
      <h4 class="mume-header" id="3-search-options">3. Search options</h4>

      <p>
        Both the precise query function and fuzzy search are available to facilitate the
        quick and accurate retrieval of desired information. This flexibility allows users
        to easily find the most relevant data for their research needs.
      </p>
      <h3 class="mume-header" id="using-the-table-and-search-functionality">
        Using the table and search functionality
      </h3>

      <p>To utilize the dataset table and search features, follow these steps:</p>
      <ol>
        <li>1.Navigate to the dataset table on Browse.</li>
        <li>2.For a precise query, enter the GEO number in the search box.</li>
        <li>3.For a fuzzy search, enter one or more keywords in the search box.</li>
        <li>
          4.Review the search results, which will display relevant datasets along with
          their motifs, data sources, and additional information.
        </li>
        <li>
          5.To access the corresponding data on the ENCODE website, click on the
          appropriate link provided in the search results.
        </li>
      </ol>
      <h3 class="mume-header" id="citation">Citation</h3>
      <ol>
        <li>
          [1] Shuangquan Zhang, Lili Yang, Xiaotian Wu, Nan Sheng, Yuan Fu, Anjun Ma, Yan
          Wang. MMGraph: a multiple motif predictor based on graph neural network and
          coexisting probability for ATAC-seq data.
          <span class="italic">Bioinformatics</span>, Volume 38, Issue 19, 1 October 2022,
          Pages 4636–4638.
        </li>
        <li>
          [2] Emily Louise Smith, Gi Fay Mok, Andrea Münsterberg; Investigating chromatin
          accessibility during development and differentiation by ATAC-sequencing to guide
          the identification of cis-regulatory elements.
          <span class="italic">Biochem Soc Trans</span> 30 June 2022; 50 (3): 1167–1177.
        </li>
        <li>
          [3] Doganli, C., Sandoval, M., Thomas, S., Hart, D. (2017). Assay for
          Transposase-Accessible Chromatin with High-Throughput Sequencing (ATAC-Seq)
          Protocol for Zebrafish Embryos. In: Wajapeyee, N., Gupta, R. (eds) Eukaryotic
          Transcriptional and Post-Transcriptional Gene Expression Regulation.
          <span class="italic">Methods in Molecular Biology</span>, vol 1507. Humana
          Press, New York, NY.
        </li>
        <li>
          [4] Article Source: Base-resolution prediction of transcription factor binding
          signals by a deep learning framework Zhang Q, He Y, Wang S, Chen Z, Guo Z, et
          al. (2022) Base-resolution prediction of transcription factor binding signals by
          a deep learning framework.
          <span class="italic">PLOS Computational Biology</span> 18(3): e1009941.
        </li>
        <li>
          [5] Chen, H., Li, H., Liu, F. et al. An integrative analysis of TFBS-clustered
          regions reveals new transcriptional regulation models on the accessible
          chromatin landscape. <span class="italic">Sci Rep</span> 5, 8465 (2015).
        </li>
        <li>
          [6] Shuangquan Zhang, Anjun Ma, Jing Zhao, Dong Xu, Qin Ma, Yan Wang, Assessing
          deep learning methods in cis-regulatory motif finding based on genomic
          sequencing data, <span class="italic">Briefings in Bioinformatics</span>, Volume
          23, Issue 1, January 2022, bbab374,
        </li>
        <li>
          [7] Li, Z., Schulz, M.H., Look, T. et al. Identification of transcription factor
          binding sites using ATAC-seq.<span class="italic"> Genome Biol</span> 20, 45
          (2019).
        </li>
        <li>
          [8] Bentsen, M., Goymann, P., Schultheis, H. et al. ATAC-seq footprinting
          unravels kinetics of transcription factor binding during zygotic genome
          activation. <span class="italic">Nat Commun</span> 11, 4267 (2020).
        </li>
        <li>
          [9] Grant CE, Bailey TL, Noble WS. FIMO: scanning for occurrences of a given motif.
          <span class="italic">Bioinformatics</span> 27(7):1017-8 (2011).
        </li>
        <li>
          [10] Gupta, S., Stamatoyannopoulos, J.A., Bailey, T.L. et al.
          Quantifying similarity between motifs. <span class="italic">Genome Biol</span> 8, R24 (2007).
        </li>
        <li>
          [11] McLeay, R.C., Bailey, T.L.
          Motif Enrichment Analysis: a unified framework and an evaluation on ChIP data.
          <span class="italic">BMC Bioinformatics</span> 11, 165 (2010).
        </li>
        <li>
          [12] Buske F A, Bodén M, Bauer D C, et al.
          Assigning roles to DNA regulatory motifs using comparative genomics.
          <span class="italic">Bioinformatics</span> 26(7): 860-866 (2010).
        </li>
      </ol>
    </div>
    <div class="md-sidebar-toc">
      <ul>
        <li>
          <a href="#introduction">Introduction</a>
          <ul>
            <li><a href="#1what-is-mmf-atac">1.What is MMF-ATAC?</a></li>
            <li><a href="#2what-is-mmgraph">2.What is MMGraph?</a></li>
            <li><a href="#3what-is-atac-seq">3.What is ATAC-seq?</a></li>
            <li>
              <a href="#4what-is-tfbs-and-motif">4.What is TFBS and motif?</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#instructions">Instructions</a>
          <ul>
            <li>
              <a href="#input-files">Inputs</a>
              <ul>
                <li>
                  <a href="#1atac-seq-bed-narrowpeak-file-required">1.ATAC-seq peak file (required)</a>
                </li>
                <li>
                  <a href="#2atac-seq-bam-file-required">2.ATAC-seq bam file (required)</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#parameters-select">Parameters setting</a>
              <ul>
                <li><a href="#1tool">1.Tools</a></li>
                <li><a href="#2species-assembly">2.Species assembly</a></li>
                <li><a href="#3submit-task">3.Tasks</a></li>
                <li>
                  <a href="#4select-motif-database">4.Select Motif database</a>
                </li>
                <li><a href="#5e-mail">5.E-mail</a></li>
                <li><a href="#6time">6.Running time</a></li>
              </ul>
            </li>
            <li>
              <a href="#output-results">Outputs</a>
              <ul>
                <li>
                  <a href="#1tasktfbss-prediction">1.MMGraph</a>
                </li>
                <li>
                  <a href="#2taskmultiple-motifs-finding">2.HINT-ATAC</a>
                </li>
                <li>
                  <a href="#3taskmotif-database-comparison">3.TOBIAS</a>
                </li>
                <li><a href="#4how-to-get-result">4.How to get result?</a></li>
              </ul>
            </li>

            <li>
              <a href="#motif-enrichment-analysis">Motif Enrichment Analysis</a>
              <ul>
                <li>
                  <a href="#1tool_enrich">1.Tool</a>
                </li>
                <li>
                  <a href="#2species_enrich">2.Species</a>
                </li>
                <li>
                  <a href="#3input-file_enrich">3.Input</a>
                </li>
                <li><a href="#4output-results_enrich">4.Outputs</a></li>
              </ul>
            </li>
            <li>
              <a href="#motif-function-analysis">Genome Ontology Enrichment Analysis</a>
              <ul>
                <li>
                  <a href="#1tool_func">1.Tool</a>
                </li>
                <li>
                  <a href="#2species_func">2.Species</a>
                </li>
                <li>
                  <a href="#3input-file_func">3.Input</a>
                </li>
                <li><a href="#4output-results_func">4.Outputs</a></li>
              </ul>
            </li>
            <li>
              <a href="#dataset-table-and-search-functionality">Dataset table and search functionality</a>
              <ul>
                <li>
                  <a href="#1-precise-query-function">1. Precise query function</a>
                </li>
                <li>
                  <a href="#2-fuzzy-search">2. Fuzzy search</a>
                </li>
                <li>
                  <a href="#3-search-options">3. Search options</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#using-the-table-and-search-functionality">Using the table and search functionality</a>
            </li>
            <li>
              <a href="#citation">Citation</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono|Source+Sans+Pro:300,400,600");
/* @import url('/node_modules/katex/dist/katex.min.css'); */

* {
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}

.back {
  background-color: #34d399;
  /* Green */
  border: none;
  color: white;
  /* padding: 15px 32px; */
  height: 50px;
  width: 240px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
}

.back:hover {
  background-color: #3e8e41;
}

.back-a {
  text-decoration: none;
}

.markdown-preview code {
  border-radius: 2px;
  color: #e96900;
  font-size: 12.8px;
  font-size: 0.8rem;
  margin: 0 2px;
  padding: 3px 5px;
  white-space: pre-wrap;
}

.markdown-preview code,
.markdown-preview pre {
  background-color: #f8f8f8;
  font-family: Roboto Mono, Monaco, courier, monospace;
}

.markdown-preview pre {
  -moz-osx-font-smoothing: initial;
  -webkit-font-smoothing: initial;
  line-height: 24px;
  line-height: 1.5rem;
  margin: 1.2em 0;
  overflow: auto;
  padding: 0 22.4px;
  padding: 0 1.4rem;
  position: relative;
  word-wrap: normal;
}

.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
  color: #8e908c;
}

.token.namespace {
  opacity: 0.7;
}

.token.boolean,
.token.number {
  color: #c76b29;
}

.token.punctuation {
  color: #525252;
}

.token.property {
  color: #c08b30;
}

.token.tag {
  color: #2973b7;
}

.token.string {
  color: #42b983;
  color: var(--theme-color, #42b983);
}

.token.selector {
  color: #6679cc;
}

.token.attr-name {
  color: #2973b7;
}

.language-css .token.string,
.style .token.string,
.token.entity,
.token.url {
  color: #22a2c9;
}

.token.attr-value,
.token.control,
.token.directive,
.token.unit {
  color: #42b983;
  color: var(--theme-color, #42b983);
}

.token.keyword {
  color: #e96900;
}

.token.atrule,
.token.regex,
.token.statement {
  color: #22a2c9;
}

.token.placeholder,
.token.variable {
  color: #3d8fd1;
}

.token.deleted {
  text-decoration: line-through;
}

.token.inserted {
  border-bottom: 1px dotted #202746;
  text-decoration: none;
}

.token.italic {
  font-style: italic;
}

.token.bold,
.token.important {
  font-weight: 700;
}

.token.important {
  color: #c94922;
}

.token.entity {
  cursor: help;
}

.markdown-preview pre>code,
.markdown-preview pre[class*="language"] {
  -moz-osx-font-smoothing: initial;
  -webkit-font-smoothing: initial;
  background-color: #f8f8f8;
  border-radius: 2px;
  color: #525252;
  display: block;
  font-family: Roboto Mono, Monaco, courier, monospace;
  font-size: 12.8px;
  font-size: 0.8rem;
  line-height: 2em;
  max-width: inherit;
  overflow: inherit;
  padding: 0.8em 1.4em;
  white-space: pre;
}

.markdown-preview pre>code {
  padding-left: 0;
  padding-right: 0;
}

.markdown-preview code:after,
.markdown-preview code:before {
  letter-spacing: 0.8px;
  letter-spacing: 0.05rem;
}

code .token {
  -moz-osx-font-smoothing: initial;
  -webkit-font-smoothing: initial;
  min-height: 24px;
  min-height: 1.5rem;
}

pre:after {
  color: #ccc;
  content: attr(data-lang);
  font-size: 9.6px;
  font-size: 0.6rem;
  font-weight: 600;
  height: 15px;
  line-height: 15px;
  padding: 5px 10px 0;
  position: absolute;
  right: 0;
  text-align: right;
  top: 0;
}

pre[data-line] {
  position: relative;
  padding: 1em 0 1em 3em !important;
}

pre[data-line] .line-highlight-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  display: block;
  width: 100%;
}

pre[data-line] .line-highlight {
  position: absolute;
  left: 0;
  right: 0;
  padding: inherit 0;
  margin-top: 1em;
  background: rgba(153, 122, 102, 0.08);
  background: linear-gradient(to right,
      rgba(153, 122, 102, 0.1) 70%,
      rgba(153, 122, 102, 0));
  pointer-events: none;
  line-height: inherit;
  white-space: pre;
}

pre[data-line] .line-highlight:before,
pre[data-line] .line-highlight[data-end]:after {
  content: attr(data-start);
  position: absolute;
  top: 0.4em;
  left: 0.6em;
  min-width: 1em;
  padding: 0 0.5em;
  background-color: rgba(153, 122, 102, 0.4);
  color: #f5f2f0;
  font: bold 65%/1.5 sans-serif;
  text-align: center;
  vertical-align: 0.3em;
  border-radius: 999px;
  text-shadow: none;
  box-shadow: 0 1px white;
}

pre[data-line] .line-highlight[data-end]:after {
  content: attr(data-end);
  top: auto;
  bottom: 0.4em;
}

@font-face {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto Mono"), local("RobotoMono-Regular"),
    url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhLq3o.ttf) format("truetype");
}

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 300;
  src: local("Source Sans Pro Light"), local("SourceSansPro-Light"),
    url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf) format("truetype");
}

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
    url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7g.ttf) format("truetype");
}

@font-face {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 600;
  src: local("Source Sans Pro SemiBold"), local("SourceSansPro-SemiBold"),
    url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdr.ttf) format("truetype");
}

* {
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}

#help:not(.ready) {
  overflow: hidden;
}

#help:not(.ready) .app-nav,
#help:not(.ready)>nav,
#help:not(.ready) [data-cloak] {
  display: none;
}

div#app {
  font-size: 30px;
  font-weight: lighter;
  margin: 40vh auto;
  text-align: center;
}

div#app:empty:before {
  content: "Loading...";
}

.emoji {
  height: 19.2px;
  height: 1.2rem;
  vertical-align: middle;
}

.progress {
  background-color: #42b983;
  background-color: var(--theme-color, #42b983);
  height: 2px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: width 0.2s, opacity 0.4s;
  width: 0;
  z-index: 5;
}

.search .search-keyword,
.search a:hover {
  color: #42b983;
  color: var(--theme-color, #42b983);
}

.search .search-keyword {
  font-style: normal;
  font-weight: 700;
}

#help {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #34495e;
  /* font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif; */
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  letter-spacing: 0;
  margin: 0;
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

a[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}

kbd {
  color: #34495e;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  font-size: 12px !important;
  line-height: 12px;
  margin-bottom: 3px;
  padding: 3px 5px;
  vertical-align: middle;
}

.task-list-item {
  list-style-type: none;
}

li input[type="checkbox"] {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

.app-nav {
  left: 0;
  margin: 25px 60px 0 0;
  position: absolute;
  right: 0;
  text-align: right;
  z-index: 2;
}

.app-nav p {
  margin: 0;
}

.app-nav>a {
  margin: 0 16px;
  margin: 0 1rem;
  padding: 5px 0;
}

.app-nav li,
.app-nav ul {
  display: inline-block;
  list-style: none;
  margin: 0;
}

.app-nav a {
  color: inherit;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s;
}

.app-nav a.active,
.app-nav a:hover {
  color: #42b983;
  color: var(--theme-color, #42b983);
}

.app-nav a.active {
  border-bottom: 2px solid #42b983;
  border-bottom: 2px solid var(--theme-color, #42b983);
}

.app-nav li {
  display: inline-block;
  margin: 0 16px;
  margin: 0 1rem;
  padding: 5px 0;
  position: relative;
}

.app-nav li ul {
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: none;
  max-height: calc(100vh - 61px);
  overflow-y: scroll;
  padding: 10px 0;
  position: absolute;
  right: -15px;
  text-align: left;
  top: 100%;
  white-space: nowrap;
}

.app-nav li ul li {
  display: block;
  font-size: 14px;
  line-height: 16px;
  line-height: 1rem;
  margin: 0;
  margin: 8px 14px;
  white-space: nowrap;
}

.app-nav li ul a {
  display: block;
  font-size: inherit;
  margin: 0;
  padding: 0;
}

.app-nav li ul a.active {
  border-bottom: 0;
}

.app-nav li:hover ul {
  display: block;
}

.app-nav.no-badge {
  margin-right: 25px;
}

.github-corner {
  border-bottom: 0;
  position: fixed;
  right: 0;
  text-decoration: none;
  top: 0;
  z-index: 1;
}

.github-corner svg {
  color: #fff;
  fill: #42b983;
  fill: var(--theme-color, #42b983);
  height: 80px;
  width: 80px;
}

.github-corner:hover .octo-arm {
  -webkit-animation: a 0.56s ease-in-out;
  animation: a 0.56s ease-in-out;
}

main {
  display: block;
  position: relative;
  width: 100vw;
  height: 100%;
  z-index: 0;
}

.anchor {
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s;
}

.anchor span {
  color: #34495e;
}

.anchor:hover {
  text-decoration: underline;
}

.sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.07);
  overflow-y: auto;
  padding: 40px 0 0;
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  transition: -webkit-transform 0.25s ease-out;
  transition: transform 0.25s ease-out;
  transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out;
  width: 300px;
  z-index: 3;
}

.sidebar>h1 {
  margin: 0 auto 16px;
  margin: 0 auto 1rem;
  font-size: 24px;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
}

.sidebar>h1 a {
  color: inherit;
  text-decoration: none;
}

.sidebar>h1 .app-nav {
  display: block;
  position: static;
}

.sidebar .sidebar-nav {
  line-height: 2em;
  padding-bottom: 40px;
}

.sidebar ul {
  margin: 0;
  padding: 0;
}

.sidebar li>p {
  font-weight: 700;
  margin: 0;
}

.sidebar ul,
.sidebar ul li {
  list-style: none;
}

.sidebar ul li a {
  border-bottom: none;
  display: block;
}

.sidebar ul li ul {
  padding-left: 20px;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

.sidebar:hover::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 0.4);
}

.sidebar:hover::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}

.sidebar-toggle {
  background-color: transparent;
  background-color: hsla(0, 0%, 100%, 0.8);
  border: 0;
  outline: none;
  padding: 10px;
  bottom: 0;
  left: 0;
  position: absolute;
  text-align: center;
  transition: opacity 0.3s;
  width: 30px;
  width: 284px;
  z-index: 4;
}

.sidebar-toggle .sidebar-toggle-button:hover {
  opacity: 0.4;
}

.sidebar-toggle span {
  background-color: #42b983;
  background-color: var(--theme-color, #42b983);
  display: block;
  margin-bottom: 4px;
  width: 16px;
  height: 2px;
}

#help.sticky .sidebar,
#help.sticky .sidebar-toggle {
  position: fixed;
}

.content {
  padding-top: 60px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 300px;
  position: absolute;
  transition: left 0.25s ease;
}

.markdown-preview>* {
  box-sizing: border-box;
  font-size: inherit;
}

.markdown-preview> :first-child {
  margin-top: 0 !important;
}

.markdown-preview hr {
  border: none;
  border-bottom: 1px solid #eee;
  margin: 2em 0;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  display: block;
  margin-bottom: 16px;
  margin-bottom: 1rem;
  overflow: auto;
  width: 100%;
}

.markdown-preview th {
  font-weight: 700;
}

.markdown-preview td,
.markdown-preview th {
  border: 1px solid #ddd;
  padding: 6px 13px;
}

.markdown-preview tr {
  border-top: 1px solid #ccc;
}

.markdown-preview p.tip,
.markdown-preview tr:nth-child(2n) {
  background-color: #f8f8f8;
}

.markdown-preview p.tip {
  border-bottom-right-radius: 2px;
  border-left: 4px solid #f66;
  border-top-right-radius: 2px;
  margin: 2em 0;
  padding: 12px 24px 12px 30px;
  position: relative;
}

.markdown-preview p.tip code {
  background-color: #efefef;
}

.markdown-preview p.tip em {
  color: #34495e;
}

.markdown-preview p.tip:before {
  background-color: #f66;
  border-radius: 100%;
  color: #fff;
  content: "!";
  font-family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  left: -12px;
  line-height: 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  text-align: center;
  top: 14px;
}

.markdown-preview p.warn {
  background: rgba(66, 185, 131, 0.1);
  border-radius: 2px;
  padding: 16px;
  padding: 1rem;
}

#help.close .sidebar {
  -webkit-transform: translateX(-300px);
  transform: translateX(-300px);
}

#help.close .sidebar-toggle {
  width: auto;
}

#help.close .content {
  left: 0;
}

@media print {

  .app-nav,
  .github-corner,
  .sidebar,
  .sidebar-toggle {
    display: none;
  }
}

@media screen and (max-width: 768px) {

  .github-corner,
  .sidebar,
  .sidebar-toggle {
    position: fixed;
  }

  .app-nav {
    margin-top: 16px;
  }

  .app-nav li ul {
    top: 30px;
  }

  main {
    height: auto;
    overflow-x: hidden;
  }

  .sidebar {
    left: -300px;
    transition: -webkit-transform 0.25s ease-out;
    transition: transform 0.25s ease-out;
    transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out;
  }

  .content {
    left: 0;
    max-width: 100vw;
    position: static;
    padding-top: 20px;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
  }

  .app-nav,
  .github-corner {
    transition: -webkit-transform 0.25s ease-out;
    transition: transform 0.25s ease-out;
    transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out;
  }

  .sidebar-toggle {
    background-color: transparent;
    width: auto;
    padding: 30px 30px 10px 10px;
  }

  #help.close .sidebar {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }

  #help.close .sidebar-toggle {
    background-color: hsla(0, 0%, 100%, 0.8);
    transition: background-color 1s;
    width: 284px;
    padding: 10px;
  }

  #help.close .content {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }

  #help.close .app-nav,
  #help.close .github-corner {
    display: none;
  }

  .github-corner .octo-arm {
    -webkit-animation: a 0.56s ease-in-out;
    animation: a 0.56s ease-in-out;
  }

  .github-corner:hover .octo-arm {
    -webkit-animation: none;
    animation: none;
  }
}

@-webkit-keyframes a {

  0%,
  to {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  20%,
  60% {
    -webkit-transform: rotate(-25deg);
    transform: rotate(-25deg);
  }

  40%,
  80% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
}

@keyframes a {

  0%,
  to {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  20%,
  60% {
    -webkit-transform: rotate(-25deg);
    transform: rotate(-25deg);
  }

  40%,
  80% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
}

section.cover {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: none;
}

section.cover .cover-main {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: -20px 16px 0;
  text-align: center;
  z-index: 1;
}

section.cover a {
  color: inherit;
}

section.cover a,
section.cover a:hover {
  text-decoration: none;
}

section.cover p {
  line-height: 24px;
  line-height: 1.5rem;
  margin: 1em 0;
}

section.cover h1 {
  color: inherit;
  font-size: 40px;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 10px 0 40px;
  margin: 0.625rem 0 2.5rem;
  position: relative;
  text-align: center;
}

section.cover h1 a {
  display: block;
}

section.cover h1 small {
  bottom: -7px;
  bottom: -0.4375rem;
  font-size: 16px;
  font-size: 1rem;
  position: absolute;
}

section.cover blockquote {
  font-size: 24px;
  font-size: 1.5rem;
  text-align: center;
}

section.cover ul {
  line-height: 1.8;
  list-style-type: none;
  margin: 1em auto;
  max-width: 500px;
  padding: 0;
}

section.cover .cover-main>p:last-child a {
  border-color: #42b983;
  border: 1px solid var(--theme-color, #42b983);
  border-radius: 2rem;
  box-sizing: border-box;
  color: #42b983;
  color: var(--theme-color, #42b983);
  display: inline-block;
  font-size: 16.8px;
  font-size: 1.05rem;
  letter-spacing: 1.6px;
  letter-spacing: 0.1rem;
  margin-right: 16px;
  margin-right: 1rem;
  padding: 0.75em 32px;
  padding: 0.75em 2rem;
  text-decoration: none;
  transition: all 0.15s ease;
}

section.cover .cover-main>p:last-child a:last-child {
  background-color: #42b983;
  background-color: var(--theme-color, #42b983);
  color: #fff;
  margin-right: 0;
}

section.cover .cover-main>p:last-child a:last-child:hover {
  color: inherit;
  opacity: 0.8;
}

section.cover .cover-main>p:last-child a:hover {
  color: inherit;
}

section.cover blockquote>p>a {
  border-bottom: 2px solid #42b983;
  border-bottom: 2px solid var(--theme-color, #42b983);
  transition: color 0.3s;
}

section.cover blockquote>p>a:hover {
  color: #42b983;
  color: var(--theme-color, #42b983);
}

section.cover.show {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

section.cover.has-mask .mask {
  background-color: #fff;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  height: 100%;
}

.sidebar,
#help {
  background-color: #fff;
}

.sidebar {
  color: #364149;
}

.sidebar li {
  margin: 6px 0 6px 15px;
}

.sidebar ul li a {
  color: #505d6b;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}

.sidebar ul li ul {
  padding: 0;
}

.sidebar ul li.active>a {
  border-right: 2px solid;
  color: #42b983;
  color: var(--theme-color, #42b983);
  font-weight: 600;
}

.app-sub-sidebar li:before {
  content: "-";
  padding-right: 4px;
  float: left;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview strong {
  color: #2c3e50;
  font-weight: 600;
}

.markdown-preview a {
  color: #42b983;
  color: var(--theme-color, #42b983);
  font-weight: 600;
}

.md-sidebar-toc a {
  color: #42b983;
  font-weight: 600;
}

.markdown-preview h1 {
  font-size: 32px;
  font-size: 2rem;
  margin: 0 0 16px;
  margin: 0 0 1rem;
}

.markdown-preview h2 {
  font-size: 28px;
  font-size: 1.75rem;
  margin: 45px 0 12.8px;
  margin: 45px 0 0.8rem;
}

.markdown-preview h3 {
  font-size: 24px;
  font-size: 1.5rem;
  margin: 40px 0 9.6px;
  margin: 40px 0 0.6rem;
}

.markdown-preview h4 {
  font-size: 20px;
  font-size: 1.25rem;
}

.markdown-preview h5,
.markdown-preview h6 {
  font-size: 16px;
  font-size: 1rem;
}

.markdown-preview h6 {
  color: #777;
}

.markdown-preview figure,
.markdown-preview p {
  margin: 1.2em 0;
}

.markdown-preview ol,
.markdown-preview p,
.markdown-preview ul {
  line-height: 25.6px;
  line-height: 1.6rem;
  word-spacing: 0.8px;
  word-spacing: 0.05rem;
}

.markdown-preview ol,
.markdown-preview ul {
  padding-left: 24px;
  padding-left: 1.5rem;
}

.markdown-preview blockquote {
  border-left: 4px solid #42b983;
  border-left: 4px solid var(--theme-color, #42b983);
  color: #858585;
  background-color: #f0f0f0;
  margin: 2em 0;
  padding-left: 20px;
}

.markdown-preview blockquote p {
  font-weight: 600;
  margin-left: 0;
}

.markdown-preview iframe {
  margin: 1em 0;
}

.markdown-preview em {
  color: #7f8c8d;
}

.markdown-preview {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.markdown-preview .pagebreak,
.markdown-preview .newpage {
  page-break-before: always;
}

.markdown-preview pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

.markdown-preview pre.line-numbers>code {
  position: relative;
}

.markdown-preview pre.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 1em;
  font-size: 100%;
  left: 0;
  width: 3em;
  letter-spacing: -1px;
  border-right: 1px solid #999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.markdown-preview pre.line-numbers .line-numbers-rows>span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}

.markdown-preview pre.line-numbers .line-numbers-rows>span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}

.markdown-preview .mathjax-exps .MathJax_Display {
  text-align: center !important;
}

.markdown-preview:not([for="preview"]) .code-chunk .btn-group {
  display: none;
}

.markdown-preview:not([for="preview"]) .code-chunk .status {
  display: none;
}

.markdown-preview:not([for="preview"]) .code-chunk .output-div {
  margin-bottom: 16px;
}

.scrollbar-style::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-style::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

.scrollbar-style::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(150, 150, 150, 0.66);
  border: 4px solid rgba(150, 150, 150, 0.66);
  background-clip: content-box;
}

#help[for="html-export"]:not([data-presentation-mode]) {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: auto;
}

#help[for="html-export"]:not([data-presentation-mode]) .markdown-preview {
  position: relative;
  top: 0;
}

@media screen and (min-width: 914px) {
  #help[for="html-export"]:not([data-presentation-mode]) .markdown-preview {
    padding: 2em calc(50% - 457px + 2em);
  }
}

@media screen and (max-width: 914px) {
  #help[for="html-export"]:not([data-presentation-mode]) .markdown-preview {
    padding: 2em;
  }
}

@media screen and (max-width: 450px) {
  #help[for="html-export"]:not([data-presentation-mode]) .markdown-preview {
    font-size: 14px !important;
    padding: 1em;
  }
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  padding: 32px 0 48px 0;
  font-size: 16px;
  box-shadow: 0 0 4px rgba(150, 150, 150, 0.33);
  box-sizing: border-box;
  overflow: auto;
  background-color: inherit;
  color: var(--text-color);
  /* height: 100vh; */
  overflow: hidden;
  background-image: inherit;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc::-webkit-scrollbar {
  width: 8px;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(150, 150, 150, 0.66);
  border: 4px solid rgba(150, 150, 150, 0.66);
  background-clip: content-box;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc a {
  text-decoration: none;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc ul {
  padding: 0 1.6em;
  margin-top: 0.8em;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc li {
  margin-bottom: 0.8em;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .md-sidebar-toc ul {
  list-style-type: none;
}

#help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .markdown-preview {
  left: 300px;
  width: calc(100% - 300px);
  padding: 2em calc(50% - 550px - 150px);
  margin: 0;
  box-sizing: border-box;
}

@media screen and (max-width: 1274px) {
  #help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .markdown-preview {
    padding: 2em;
  }
}

@media screen and (max-width: 450px) {
  #help[for="html-export"]:not([data-presentation-mode])[html-show-sidebar-toc] .markdown-preview {
    width: 100%;
  }
}

#help[for="html-export"]:not([data-presentation-mode]):not([html-show-sidebar-toc]) .markdown-preview {
  left: 50%;
  transform: translateX(-50%);
}

#help[for="html-export"]:not([data-presentation-mode]):not([html-show-sidebar-toc]) .md-sidebar-toc {
  display: none;
}

/* Please visit the URL below for more information: */
/*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */
</style>

<script>
import MathFormula from "./MathFormula.vue";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    MathFormula,
  },
  data() {
    return {
      RunningTime: [
        {
          sampleNumber: "Sample 1",
          geoNumber: "GSE215704",
          bedSize: "3.81 MB",
          bamSize: "1.94 GB",
          expectedTime: "2 hours and 11 minutes",
        },
        {
          sampleNumber: "Sample 2",
          geoNumber: "GSE215595",
          bedSize: "2.29 MB",
          bamSize: "2.65 GB",
          expectedTime: "1 hour and 12 minutes",
        },
      ],
      // bedtable: [
      //   {
      //     chrom: "chr22",
      //     start: "21641904",
      //     end: "21642586",
      //     name: ".",
      //     score: "1000",
      //     strand: ".",
      //     signalvalue: "17.81314",
      //     pvalue: "781.11261",
      //     qvalue: "773.77698",
      //     peak: "245",
      //   },
      //   {
      //     chrom: "chr22",
      //     start: "20916753",
      //     end: "20917550",
      //     name: ".",
      //     score: "1000",
      //     strand: ".",
      //     signalvalue: "19.42583",
      //     pvalue: "683.03735",
      //     qvalue: "676.21100",
      //     peak: "556",
      //   },
      //   {
      //     chrom: "chr22",
      //     start: "21735446",
      //     end: "21736444",
      //     name: ".",
      //     score: "1000",
      //     strand: ".",
      //     signalvalue: "17.29705",
      //     pvalue: "630.56628",
      //     qvalue: "623.92041",
      //     peak: "526",
      //   },
      // ],
    };
  },
  mounted() {
    let goto = this.$route.query.goto;
    // console.log(goto);
    if (goto) {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = goto;
      // console.log(link);
      // document.body.appendChild(link);
      link.click();
      link.remove();
    }
    // const createSnowFlake = () => {
    //     const snowflake_help = document.createElement("span");
    //     snowflake_help.classList.add("material-symbols-outlined");
    //     snowflake_help.textContent = "ac_unit";
    //     snowflake_help.classList.add(`snowflake_help`);
    //     // let pre = document.getElementsByClassName('predict')
    //     if (document.getElementById('help')) {
    //         document.getElementById("help").appendChild(snowflake_help);
    //     }
    //     const winWidth = window.innerWidth;

    //     let randomLeft = getRandomNumber(0, winWidth - 50);
    //     let randomOpacity = getRandomNumber(0, 1);
    //     let randomSize = getRandomNumber(0.6, 2);

    //     snowflake_help.style.left = randomLeft + "px";
    //     snowflake_help.style.animationDuration = Math.random() * 3 + 2 + "s";
    //     snowflake_help.style.opacity = randomOpacity;
    //     snowflake_help.style.fontSize = randomSize + "rem";

    //     setTimeout(() => {
    //         // remove snowflake after 5s
    //         snowflake_help.remove();
    //     }, 5000);
    // };

    // const getRandomNumber = (min, max) => {
    //     return Math.random() * (max - min) + min;
    // };

    // setInterval(createSnowFlake, 40);
  },
  methods: {
    motif_click(event) {
      event.preventDefault();
      // 在这里添加点击事件的处理逻辑
      return new Promise((resolve, reject) => {
        axios
          .post("/api/download", qs.stringify({ name: 'GSE187636_motif' }), {
            responseType: "blob",
          })
          .then((res) => {
            if (!res) return;
            const fileName = res.headers["content-disposition"].split("filename=")[1];
            const response = res.data;
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                const blobObject = new Blob([response]);
                window.navigator.msSaveOrOpenBlob(blobObject, fileName);
              } catch (e) {
                console.log(e);
                reject(e);
              }
              return;
            }
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", fileName.replace(new RegExp('"', "g"), ""));
            console.log(link);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
            alert('File to expire')
            reject(error);
          });
      });
    },
    ame_click(event) {
      event.preventDefault();
      // 在这里添加点击事件的处理逻辑
      return new Promise((resolve, reject) => {
        axios
          .post("/api/download", qs.stringify({ name: 'GSE187636_AME' }), {
            responseType: "blob",
          })
          .then((res) => {
            if (!res) return;
            const fileName = res.headers["content-disposition"].split("filename=")[1];
            const response = res.data;
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                const blobObject = new Blob([response]);
                window.navigator.msSaveOrOpenBlob(blobObject, fileName);
              } catch (e) {
                console.log(e);
                reject(e);
              }
              return;
            }
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", fileName.replace(new RegExp('"', "g"), ""));
            console.log(link);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
            alert('File to expire')
            reject(error);
          });
      });
    },
    gomo_click(event) {
      event.preventDefault();
      // 在这里添加点击事件的处理逻辑
      return new Promise((resolve, reject) => {
        axios
          .post("/api/download", qs.stringify({ name: 'GSE187636_GOMo' }), {
            responseType: "blob",
          })
          .then((res) => {
            if (!res) return;
            const fileName = res.headers["content-disposition"].split("filename=")[1];
            const response = res.data;
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                const blobObject = new Blob([response]);
                window.navigator.msSaveOrOpenBlob(blobObject, fileName);
              } catch (e) {
                console.log(e);
                reject(e);
              }
              return;
            }
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", fileName.replace(new RegExp('"', "g"), ""));
            console.log(link);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
            alert('File to expire')
            reject(error);
          });
      });
    },
  },
};
</script>
