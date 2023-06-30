<template>
    <div>
        <el-result
            icon="warning"
            title="404 Tips"
            sub-title="The page you are looking for is lost~"
        >
            <template #extra>
            <el-button type="primary" @click="$router.push('/')">Back to Home Page</el-button>
            <!-- $router只能在template中使用 -->
            </template>
      </el-result> 
    </div>
</template>