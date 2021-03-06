var configSpawn = require('config.spawn');
var actionW51S59Spawn = {
    /** @param {Spawn} spawn **/
        run: function (spawn) {

            var totalHarvester = configSpawn[0].W51S59[0].number + configSpawn[0].W51S59[2].number + configSpawn[0].W51S59[4].number;
            var totalUpgrader = configSpawn[0].W51S59[6].number + configSpawn[0].W51S59[7].number;
            var totalBuilder = configSpawn[0].W51S59[8].number + configSpawn[0].W51S59[9].number;
            var nameCreeps = undefined;
            var roomEnergy = Game.spawns.Factory01.room.energyAvailable;

            //判定建筑物
            var constructionSites = Game.spawns.Factory01.room.find(FIND_CONSTRUCTION_SITES);

            if(roomEnergy >= 300){

                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                if(_.size(harvesters) < totalHarvester) {
                    if(roomEnergy < 300) {
                        var newNameHarvesters = Game.spawns['Factory01'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
                        console.log('正在建造新的开采虫：' + newNameHarvesters);
                    }
                    else {
                        if(roomEnergy >= 300 && roomEnergy < 400) {
                            var newNameHarvesters = Game.spawns['Factory01'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                            console.log('正在建造新的开采虫：' + newNameHarvesters);
                        }
                        else {
                            if(roomEnergy >= 400) {
                                var newNameHarvesters = Game.spawns['Factory01'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
                                console.log('正在建造新的开采虫：' + newNameHarvesters);
                            }
                        }
                    }
                }

                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                if(_.size(harvesters) >= totalHarvester && _.size(upgraders) <= totalUpgrader) {
                    if(roomEnergy < 400) {
                        var newNameUpgraders = Game.spawns['Factory01'].createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
                        console.log('正在建造新的升级虫：' + newNameUpgraders);
                    }
                    if(roomEnergy > 400) {
                        var newNameUpgraders = Game.spawns['Factory01'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
                        console.log('正在建造新的升级虫：' + newNameUpgraders);
                    }
                }

                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                if(_.size(harvesters) >= totalHarvester && constructionSites.length > 0) {
                    if(roomEnergy < 300 && builders.length < totalBuilder) {
                        var newNameBuilders = Game.spawns['Factory01'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
                        console.log('正在建造新的建造虫：' + newNameBuilders + "正在等待建造的建筑数为：" + constructionSites.length);
                    }
                    else {
                        if(roomEnergy >= 350) {
                            var newNameBuilders = Game.spawns['Factory01'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {role: 'builder'});
                            console.log('正在建造新的建造虫：' + newNameBuilders + " 正在等待建造的建筑数为：" + constructionSites.length);
                        }
                    }

                }

            }
          //代码虫部件作用一览：
          //MOVE是移动部件，每一个MOVE可以在每一个游戏时中减少2点疲劳度下降；CARRY是背包部件，每一个CARRY可以提高50点可以携带能量极限
          //WORK是工作部件，如果是harvest命令，每一个游戏时获取2点能量；如果是build命令，每一个游戏时建造5点；如果是repair，每一个游戏时使用1点能量修复100点生命；
          //WORK是工作部件，如果是dismantle命令，每一个游戏时拆除50点建筑生命值并返回0.25点能量;如果是upgrade命令，每一个游戏时为RCL提供1点升级。
          //ATTACK是攻击部件，每一个游戏时对敌方代码虫/代码造物造成30点伤害。
          //RANGED_ATTACK是攻击部件，每一个游戏时对在3个方格距离内的单一代码虫/代码造物造成10点伤害；每一个游戏时对在3个方格距离内的所有代码虫/代码造物分别造成1-4-10伤害。
          //HEAL是治疗部件，每一个游戏时对自己或在距离自己小范围内的单一代码虫治疗12点生命，如果距离较远，每一个游戏时治疗4点生命值。
          //CLAIM是殖民部件，作用是对一个RCL进行获取控制/攻击/降级；对己方的RCL，每一个部件点数可以为RCL提供1个游戏时的储量；对敌方的RCL，对RCL进行降级和加速降级计时器；
          //CLAIM是殖民部件，装载有CLAIM的代码虫会有500秒的寿命缩减，而且不能被重置。
          //TOUGH是防御部件，装载有这个部件的代码虫可以获得10点生命值加成，每一个防御部件增加10点生命。
      }
}

module.exports = actionW51S59Spawn;
