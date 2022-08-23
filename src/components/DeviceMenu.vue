<template>
    <div>
        <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
                :default-active="active"
        >

            <el-menu-item v-for="(item,index) of routerInfo" :key="index" :index="item.index" :route="item.url">
                <span><i :class="item.icon"/>{{item.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "DeviceMenu",
        data(){
            return{
                active:'list',
                routerInfo:{
                    list: {
                        index: 'list',
                        url: '/deviceManage/deviceList',
                        icon: 'el-icon-tickets',
                        name: '设备列表'
                    },
                    detail: {
                        index: 'detail',
                        url: '/deviceManage/deviceDetails',
                        icon: 'el-icon-more-outline',
                        name: '设备详情'
                    },
                    real: {
                        index: 'real',
                        url: '/deviceManage/realTimeMonitoring',
                        icon: 'el-icon-video-camera',
                        name: '设备监控'
                    },
                    history: {
                        index: 'history',
                        url: '/deviceManage/historicalTrack',
                        icon: 'el-icon-film',
                        name: '历史轨迹'
                    },
                    alarm: {
                        index: 'alarm',
                        url: '/deviceManage/deviceAlarm',
                        icon: 'el-icon-aim',
                        name: '设备报警'
                    },
                }
            }
        },
        watch:{
          '$route.query.where':{
              handler(newVal,oldVal){
                 if(newVal!==undefined){
                     this.active=this.$route.query.where
                     this.$router.push({
                         path: this.routerInfo[this.active].url
                     })
                 }
              },
              deep:true
          }
        },
        created() {
            if(this.$route.query.where){
                this.active=this.$route.query.where
            }
            this.$router.push({
                path: this.routerInfo[this.active].url
            })

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        height: 92.8vh;
        overflow-y: auto;
        text-align: center;
    }
    .el-menu-vertical-demo i{
        color:white;
    }
    .el-menu-vertical-demo .is-active i{
        color: #f2ce91 !important;
    }
    .el-menu-item:hover i {
        color: #f2ce91 !important;
    }
</style>