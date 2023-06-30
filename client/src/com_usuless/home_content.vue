<template>
    <div class="contentup">
        <div class="dna_left">
        </div>
        <div class="atac">
            <img src="../images/ATAC-seq.png" alt="" height="600px">
        </div>
        <div class="dna_right"></div>
    </div>
    <!-- <div class="contentdown">
        <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }"><img src="../images/homo-set.png" alt=""
                class="homo-set"> </router-link>
        <div class="homo">
            <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
                <img src="../images/homo.png" alt="">
                <p class="classify">Homo sapiens</p>
            </router-link>
        </div>
        <div class="mus">
            <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
                <img src="../images/mus.png" alt="">
                <p class="classify">Mus musculus</p>
            </router-link>
        </div>
        <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }"><img src="../images/mus-set.png" alt=""
                class="mus-set"> </router-link>
    </div> -->
</template>

<style>
.contentup {
    width: 1200px;
    margin: 50px auto;
}

.dna_left {
    float: left;
    width: 275px;
    height: 620px;
    background-image: url(../images/dna.png);
}


.atac {
    float: left;
    width: 650px;
    height: 620px;
    /* border: 1px solid #ccc; */
    text-align: center;
}

.dna_right {
    float: right;
    width: 275px;
    height: 620px;
    background-image: url(../images/dna.png);
}
/* 
.contentdown {
    width: 1200px;
    margin: 0 auto;
}

.homo-set {
    float: left;

}

.homo {
    float: left;
    width: 400px;
    height: 300px;
    border: #e5e5e5 2px solid;
    margin-left: 40px;
    margin-top: 30px;
}

.homo img {
    margin: 30px 75px;
}

.mus {
    float: left;
    width: 400px;
    height: 300px;
    border: #e5e5e5 2px solid;
    margin-left: 50px;
    margin-top: 30px;
    margin-right: 30px;
}

.mus img {
    margin: 30px 75px;
}

.classify {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    color: #000;
}

.mus-set {
    float: left;
} */
</style>

