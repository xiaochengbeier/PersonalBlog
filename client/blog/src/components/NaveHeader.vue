<template>
  <div>
    <a-row   type="flex" class="md-with header"  justify="space-around" align="middle">
      <a-col :xs="4"  >
        <router-link to="/">
           <div :class="runcircleClass">
          <svg width="50" height="51" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>background</title>
          <rect fill="none" id="canvas_background" height="53" width="52" y="-1" x="-1"/>
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
          <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
          </g>
        </g>
        <g>
          <title>Layer 1</title>
          <path stroke="#000" id="svg_1" d="m25.22608,2c6.28542,0 11.3845,5.26672 11.3845,11.75253c0,6.48581 -5.09909,11.74747 -11.3845,11.74747c-6.28542,0 -11.38451,5.26673 -11.38451,11.75253c0,6.48581 5.09909,11.74747 11.38451,11.74747c12.57083,0 22.77392,-10.52839 22.77392,-23.5c0,-12.97162 -10.20309,-23.5 -22.77392,-23.5l0,0zm0,8.07987c-1.9652,0 -3.55919,1.6448 -3.55919,3.67267c0,2.02786 1.59399,3.67267 3.55919,3.67267c1.96521,0 3.55919,-1.6448 3.55919,-3.67267c0,-2.02786 -1.59398,-3.67267 -3.55919,-3.67267zm0,23.5c1.96419,0 3.55919,1.64585 3.55919,3.67267c0,2.02681 -1.595,3.67267 -3.55919,3.67267c-1.96419,0 -3.55919,-1.64586 -3.55919,-3.67267c0,-2.02681 1.595,-3.67267 3.55919,-3.67267zm22.26311,-8.0649c0,12.96198 -10.1831,23.46974 -22.7446,23.46974c-12.56149,0 -22.7446,-10.50776 -22.7446,-23.46974c0,-12.96198 10.1831,-23.46974 22.7446,-23.46974c12.5615,0 22.7446,10.50776 22.7446,23.46974z" stroke-width="1.5" fill="#000000"/>
        </g>
        </svg>
        </div>
        </router-link>
       
      </a-col>
      <a-col :md="2" class="d-sx-none d-md-block">
        <router-link tag="span" to="/"><span class="title-list-hover">首页</span></router-link> 
      </a-col>
      <a-col :xs="15" :sm="10">
        <a-input-search
          placeholder="input search text"
          enter-button="搜索"
          v-model="searchValue"
          size="large"
          @search="onSearch"
        />
      </a-col>
      <a-col :sm="4" class="d-sx-none d-md-block">
        <div v-if="isLoginFlag">
          <div class="poster" id="user-img">
            <div >
               <img @click="goMyPick" :src="isLoginFlag.poster" alt="">
            </div>
          </div>
        </div>
        <router-link v-else tag="span" to="/reglog"><span class="title-list-hover">登录/注册</span></router-link> 
      </a-col>
      <a-col :lg="4" class="d-sx-none d-md-block">
        <router-link tag="span" to="/write"><span class="write-center">创作中心</span></router-link> 
      </a-col>
      <a-col :xs="4"   class="d-sm-block d-md-none">
        <div class="show-btn">
          <svg width="53" height="34" @click="showDrawer" >
          <g>
            <title>background</title>
            <rect fill="#fff" id="canvas_background" height="36" width="55" y="-1" x="-1"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
            </g>
          </g>
          <g>
            <path stroke="#000" id="svg_2" d="m4.96511,7.83452l0,0l0,-0.00342l0,0.00342zm0.0017,-0.00342l9.83454,9.8715l-9.83624,9.86808l3.61616,3.63021l13.4524,-13.5l-13.4524,-13.5l-3.61446,3.63021zm17.42644,23.12356l24.57185,0l0,-5.12812l-24.57185,0l0,5.12812zm7.3874,-10.68714l17.18445,0l0,-5.12812l-17.18445,0l0,5.12812zm-7.3874,-15.81697l0,5.13154l24.57185,0l0,-5.13154l-24.57185,0z" stroke-width="1.5" fill="#000000"/>
          </g>
        </svg>
        </div>
      </a-col>
    </a-row>
    <!-- 小屏幕下功能展示 -->
         <a-drawer
      title="我的"
      wrapClassName="d-sm-block d-md-none"
      :placement="placement"
      :closable="true"
      :visible="visible"
      height="60%"
      @close="onClose"
    >
      <div class="sub-item">
        <div v-if="isLoginFlag" class="user-info">
          <div class="poster">
           <div class="poster">
              <img :src="isLoginFlag.poster" alt="">
          </div>
          </div>
          <div class="info" @click="onClose">
            <span>
              <span>{{isLoginFlag.name}}</span>
            </span>
          </div>
        </div>
        <div v-else class="user-info">
          <div class="poster">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
            <g stroke="null">
              <title>background</title>
              <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1" stroke="null"/>
              <g display="none" id="canvasGrid" stroke="null">
              <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_2" stroke="null"/>
              </g>
            </g>
            <g stroke="null">
              <title>Layer 1</title>
              <path id="svg_1" d="m21.00287,4.5c-7.11711,0 -13.13552,4.50997 -15.21031,10.73742l3.8246,0c1.90694,-4.27352 6.27434,-7.26786 11.38571,-7.27709c6.86118,0.01153 12.41298,5.3912 12.42369,12.03851c-0.01071,6.64846 -5.56251,12.02813 -12.42369,12.03966c-5.11137,-0.00807 -9.47996,-3.00473 -11.3869,-7.27939l-3.82341,0c2.07597,6.22745 8.0932,10.73858 15.2115,10.74088c8.83121,-0.00231 15.99475,-6.93913 15.99594,-15.5c-0.00238,-8.56203 -7.16591,-15.49769 -15.99713,-15.5zm-4.93877,20.25796l8.51101,-4.75912l-8.51101,-4.76258l0,2.64946l-13.0641,0l0,4.22276l13.0641,0l0,2.64946z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#7DD8B5"/>
            </g>
            </svg>
          </div>
          <div class="info" @click="onClose">
            <router-link to="/reglog" tag="span">
              <span>登录/注册</span>
            </router-link>
          </div>
        </div>
      
      </div>
      <div class="sub-item">
          <div class="user-info">
            <div class="poster">
               <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" style="vector-effect: non-scaling-stroke;" stroke="null">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

 <g stroke="null">
  <title style="vector-effect: non-scaling-stroke;" stroke="null">background</title>
  <rect style="vector-effect: non-scaling-stroke;" stroke="null" x="-1" y="-1" width="42" height="42" id="canvas_background" fill="none"/>
  <g style="vector-effect: non-scaling-stroke;" stroke="null" id="canvasGrid" width="100%" height="100%" x="0" y="0" overflow="visible" display="none">
   <rect style="vector-effect: non-scaling-stroke;" stroke="null" id="svg_2" width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/>
  </g>
 </g>
 <g stroke="null">
  <title style="vector-effect: non-scaling-stroke;" stroke="null">Layer 1</title>
  <path stroke="#000" fill="#74556D" stroke-width="1.5" d="m31.51111,14.23136l-2.63822,0c-0.2576,-2.19259 -1.55182,-4.51444 -3.04142,-6.49105c-1.58916,-2.02896 -3.30276,-3.65541 -4.70898,-3.87794c-0.07716,-0.01309 -0.15431,-0.02291 -0.2464,-0.02454l-9.24498,0c-0.14809,0 -0.29244,0.07691 -0.39698,0.21599c-0.10329,0.13581 -0.16427,0.32725 -0.16427,0.5236l0,9.65394l-2.58098,0c-1.37387,0 -2.48889,1.46609 -2.48889,3.27252l0,14.52181l5.06987,0l0,3.40179c0,0.19308 0.05724,0.37634 0.16427,0.52033c0.10702,0.13908 0.24764,0.21435 0.39698,0.21435l16.73156,0c0.14684,0 0.28871,-0.07527 0.39573,-0.21435s0.17173,-0.32562 0.17173,-0.52033l0,-3.40179l5.06987,0l0,-14.52181c0,-1.80643 -1.11378,-3.27252 -2.48889,-3.27252zm-3.70844,20.4549l-15.6128,0l0,-5.11495l15.6128,0l0,5.11495zm0,-17.51617c0,-0.04909 0,-0.10309 -0.00373,-0.15708c-0.01867,-0.11127 -0.07716,-0.2209 -0.15431,-0.32725l-15.45476,0l0,-11.37201l8.69493,0l0,0.00163c0.37956,-0.03109 0.7056,0.46143 0.95698,1.58881c0.22773,1.07175 0.28498,2.46912 0.28498,3.43942c0.00124,0.7085 -0.02364,1.18629 -0.02364,1.18629l-0.04604,0.78214l0.59733,0.00818c0.00249,0 1.38009,0.02291 2.7328,0.42543c1.2992,0.3698 2.31467,1.10448 2.41173,1.93734c0.00373,0.07363 0.00373,0.1489 0.00373,0.21762l0,2.26949z" id="svg_1"/>
 </g>
               </svg>
            </div>
            <div class="info"  @click="onClose">
             <router-link tag="div"   to="/write">
              <span>发表文章</span>
             </router-link> 
            </div>
          </div>
      </div>
      <div class="sub-item">
          <div class="user-info">
          <div class="poster">
           <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" stroke="null" style="vector-effect: non-scaling-stroke;">
          <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

          <g stroke="null">
            <title stroke="null" style="vector-effect: non-scaling-stroke;">background</title>
            <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1" stroke="null" style="vector-effect: non-scaling-stroke;"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid" stroke="null" style="vector-effect: non-scaling-stroke;">
            <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_2" stroke="null" style="vector-effect: non-scaling-stroke;"/>
            </g>
          </g>
          <g stroke="null">
            <title stroke="null" style="vector-effect: non-scaling-stroke;">Layer 1</title>
            <path id="svg_1" d="m32.2324,18.99037c-1.43397,-1.58322 -3.18833,-2.86501 -4.94808,-3.76166c-2.05335,0.91908 -4.55422,1.47873 -7.28065,1.47873c-2.73179,0 -5.23625,-0.56074 -7.28598,-1.47873c-1.75974,0.89666 -3.5159,2.17844 -4.95339,3.76166c-3.33692,3.67579 -3.7039,7.44621 -0.82173,8.42383c1.29075,0.44039 2.64409,0.11215 4.04224,-0.71121c-0.24525,0.83483 -0.38848,1.73968 -0.38848,2.68612c0,4.20481 2.67275,7.61089 5.96663,7.61089c1.98533,0 2.96813,-1.24023 3.44071,-3.13911c0.47084,1.89888 1.45363,3.13911 3.43177,3.13911c3.29929,0 5.97207,-3.40607 5.97207,-7.61089c0,-0.94645 -0.14327,-1.85129 -0.39386,-2.68612c1.4017,0.82335 2.75325,1.15159 4.04759,0.71121c2.88039,-0.97762 2.50799,-4.74804 -0.82884,-8.42383l0,0zm-12.23226,-3.71735c5.54234,0 10.03747,-2.74739 10.03747,-6.1365s-4.49513,-6.13651 -10.03747,-6.13651c-5.54423,0 -10.0429,2.74794 -10.0429,6.13651s4.49868,6.1365 10.0429,6.1365z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#845335"/>
          </g>
           </svg>
          </div>
          <div class="info"  @click="onClose">
             <span tag="span" @click="goMyContent('/aboutme/mypick')">
              <span>我的关注</span>
             </span>
          </div> 
        </div>
      </div>

      <div class="sub-item">
         <div class="user-info">
            <div class="poster">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" style="vector-effect: non-scaling-stroke;" stroke="null">
                  <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

                  <g stroke="null">
                    <title style="vector-effect: non-scaling-stroke;" stroke="null">background</title>
                    <rect style="vector-effect: non-scaling-stroke;" stroke="null" x="-1" y="-1" width="42" height="42" id="canvas_background" fill="none"/>
                    <g style="vector-effect: non-scaling-stroke;" stroke="null" id="canvasGrid" width="100%" height="100%" x="0" y="0" overflow="visible" display="none">
                    <rect style="vector-effect: non-scaling-stroke;" stroke="null" id="svg_2" width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/>
                    </g>
                  </g>
                  <g stroke="null">
                    <title style="vector-effect: non-scaling-stroke;" stroke="null">Layer 1</title>
                    <path id="svg_1" d="m20.01548,15.90271c-2.22513,0 -4.02814,1.80301 -4.02814,4.02814c0,2.2241 1.80301,4.02814 4.02814,4.02814c0.50984,0 0.99284,-0.10527 1.44179,-0.27866l0.8628,1.3262l1.40257,-0.91338l-0.85764,-1.31691c0.7276,-0.72864 1.17862,-1.7349 1.17862,-2.8454c0,-2.22513 -1.80301,-4.02814 -4.02814,-4.02814zm-0.01548,-10.90271c-8.28437,0 -15,6.71563 -15,15c0,8.28437 6.71563,15 15,15c8.28437,0 15,-6.71563 15,-15c0,-8.28437 -6.71563,-15 -15,-15zm10.50021,19.96319c-0.24873,0.52016 -0.52945,1.02174 -0.85248,1.49649l-3.25925,-0.70077c-0.49642,0.54286 -1.06199,1.02587 -1.68639,1.42941l0.12282,3.30466c-0.52326,0.23737 -1.06096,0.4345 -1.61931,0.58828l-2.01768,-2.59461c-0.38393,0.05264 -0.77405,0.08876 -1.17242,0.08876c-0.36741,0 -0.72864,-0.02993 -1.0847,-0.07637l-2.00736,2.58016c-0.55835,-0.15584 -1.09915,-0.35297 -1.62034,-0.58724l0.12075,-3.24687c-0.65433,-0.41076 -1.24673,-0.90822 -1.76689,-1.47275l-3.17256,0.6791c-0.32304,-0.47062 -0.60169,-0.97427 -0.85248,-1.49443l2.15495,-2.38303c-0.23325,-0.72554 -0.36535,-1.49752 -0.39734,-2.29428l-2.85675,-1.51094c0.05676,-0.58105 0.17029,-1.14249 0.31065,-1.69568l3.18288,-0.44069c0.2993,-0.72451 0.69664,-1.39535 1.17139,-2.00427l-1.2199,-2.99401c0.41179,-0.40147 0.85661,-0.76785 1.32414,-1.10431l2.74838,1.72561c0.67084,-0.34781 1.39225,-0.61201 2.15185,-0.77405l0.99904,-3.09722c0.28691,-0.02167 0.57279,-0.04335 0.86384,-0.04335c0.29104,0 0.57796,0.02271 0.86384,0.04335l1.00729,3.12509c0.74309,0.16823 1.44592,0.42934 2.10128,0.77405l2.7907,-1.75141c0.46959,0.33645 0.91544,0.70283 1.3262,1.10431l-1.25499,3.08174c0.44172,0.58208 0.81843,1.21887 1.10224,1.90416l3.28712,0.45514c0.13933,0.55215 0.25492,1.11566 0.31168,1.69568l-2.95892,1.56461c-0.03509,0.74928 -0.15481,1.47585 -0.36638,2.16733l2.22513,2.45837z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#7DD8B5"/>
                  </g>
                </svg>
            </div>
            <div class="info"  @click="onClose">
              <span @click="goMyContent('/aboutme/editinfo')">
                <span>个人信息</span>
              </span>
            </div>
          </div>
      </div>
        <div class="sub-item">
         <div class="user-info"  >
            <div class="poster">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

 <g stroke="null">
  <title>background</title>
  <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1" stroke="null"/>
  <g display="none" id="canvasGrid" stroke="null">
   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_2" stroke="null"/>
  </g>
 </g>
 <g stroke="null">
  <title>Layer 1</title>
  <path stroke="#000" id="svg_1" d="m5.75568,24.91375c-0.1108,-0.47901 -0.12116,-0.99284 -0.12116,-0.99284c0,0 -1.39666,-1.59582 -2.08246,-2.50023c-0.57811,-0.76302 -1.53758,-2.94992 -1.53758,-2.94992c0,0 -0.05101,-0.55269 0.03851,-0.56818c0.1452,-0.02453 0.89796,0.83791 1.63256,1.34142c0.75667,0.5187 1.62496,0.85985 1.62496,0.85985l0.94972,0c0,0 -0.78007,-2.69122 0.22058,-2.33852c0.36154,0.04003 0.56134,1.05813 1.112,1.17009c0.64523,-0.20815 0.96295,-2.64894 0.96295,-2.64894c0,0 -0.19622,-0.45445 -0.18739,-0.886c0.00712,-0.28533 0.221,-0.61101 0.221,-0.61101c0,0 -0.45622,0.09975 -0.76895,-0.03226c-0.28182,-0.11911 -0.71236,-0.58229 -0.82634,-0.92473c-0.14108,-0.42388 -0.10448,-0.89283 -0.25435,-1.1623c-0.01487,-0.21147 0.19253,-0.28356 0.30268,-0.18432c0.41464,0.37364 0.96416,0.41339 1.08276,0.48987c0.49624,0.32009 1.33318,0.36474 1.45522,0.30061c-1.09828,-1.79561 0.29509,-2.1684 0.48923,-2.20646c0.24295,0.34672 0.60905,0.76355 0.714,1.1423c0.1391,0.23049 0.12779,-0.09715 0.12779,-0.09715c0,0 0.00712,-0.96638 0.32425,-1.69003c0.0731,-0.16881 0.47722,-0.7078 0.74663,-0.75497c0.09767,-0.01709 0.30478,-0.05561 0.52514,-0.31532c0.56303,-0.66358 2.09932,-0.5526 2.09932,-0.5526c0,0 0.12436,0.07552 0.35688,0.07423c0.2053,-0.00159 3.81786,-0.2814 5.29528,0.41606c0.99307,0.46881 2.76925,0.3286 4.90873,-0.4735c0.67529,-0.25316 2.62568,-0.3189 2.62568,-0.3189c0,0 0.73765,0.0537 1.33637,0.31939c0.93342,0.4142 2.71094,0.25385 3.80022,0.40556c0.4204,0.05874 1.2253,0.57591 1.89132,1.05868c2.094,1.51775 3.31432,4.91657 3.16678,6.07418c-0.28754,2.25613 -2.0002,6.12101 -2.7568,7.82043c-0.3061,0.68753 -0.46372,1.73148 -0.39673,2.52529c0.01951,0.23118 -0.23172,0.8094 -0.70812,1.20358c-0.67139,0.55554 -0.16531,1.37017 -0.10325,1.74458c0.0618,0.37344 0.0412,0.85243 -0.14105,0.95896c-0.18149,0.10585 -2.77548,0.70191 -2.85157,-0.09265c-0.3799,-0.89705 1.48554,-2.25958 1.27224,-3.84322c-0.6104,-1.05365 -0.75217,-3.40094 -0.84989,-3.76121c-0.1022,-1.62112 -2.10198,0.91852 -3.11035,1.43826c-2.89812,1.49376 -6.16855,0.82039 -6.42576,0.69493c-0.35294,1.40804 0.01963,2.10412 0.04367,2.27552c-0.07933,0.96019 0.70166,2.49928 0.87612,3.44263c0.14282,0.75605 -2.29778,0.75605 -2.96711,0.72592c-0.55098,-0.1943 0.27732,-1.60984 0.41231,-1.7678c0.18379,-1.2161 -0.84126,-2.30629 -0.84126,-2.30629c0,0 -0.07321,1.09018 -0.27696,2.00547c0.0085,0.43142 0.33529,0.74495 0.38288,1.12968c0.05053,0.41088 -0.18739,0.46446 -0.18739,0.46446c0,0 -1.87102,0.4405 -2.34239,-0.07133c-0.23641,-0.0974 -0.44249,0.06133 -0.60805,-0.10749c-0.11503,-0.11813 0.07481,-0.79399 0.21732,-0.98089c0.1219,-0.16072 0.93532,-0.19541 0.94162,-1.48892c-0.20155,-2.2977 -1.86116,-3.25962 -1.98478,-4.15341c-0.80382,0.41282 -1.64899,-0.36309 -1.64899,-0.36309c0,0 -0.22099,0.33599 -0.46432,0.39955c-0.19524,0.05036 -0.91147,-0.55351 -1.15133,-0.90535c-0.07741,1.37789 -0.94259,1.01027 -0.94259,1.01027c0,0 -0.30587,0.67699 -0.79201,1.00412c-1.19833,0.8064 -1.41799,0.74227 -1.91266,1.35758c-0.27859,0.34653 -0.76823,-0.16547 -1.09174,-0.0061c-1.17149,0.57716 -1.87926,-0.16032 -1.82339,-1.79754z" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="#7DD8B5"/>
 </g>
</svg>
            </div>
            <div class="info" @click="onClose">
              <span @click="goMyContent('/aboutme/myproject')">
                <span>我的项目</span>
              </span>
            </div>
          </div>
      </div>

          <div class="sub-item">
         <div class="user-info">
            <div class="poster">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
                  <g stroke="null">
                    <title>background</title>
                    <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1" stroke="null"/>
                    <g display="none" id="canvasGrid" stroke="null">
                    <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_2" stroke="null"/>
                    </g>
                  </g>
                  <g stroke="null">
                    <title>Layer 1</title>
                    <path id="svg_1" d="m29.15044,7.1043c-2.49194,-2.13469 -5.17963,-3.84471 -7.38436,-4.07783c-0.12002,-0.01512 -0.24434,-0.02394 -0.37579,-0.02646l-14.5101,0c-0.23148,0 -0.46009,0.07939 -0.62298,0.22683c-0.16146,0.14366 -0.2572,0.34528 -0.2572,0.55068l0,32.44876c0,0.20414 0.09002,0.39947 0.2572,0.54816c0.16718,0.14618 0.38722,0.22557 0.62298,0.22557l26.23964,0c0.23148,0 0.45295,-0.07813 0.62013,-0.22557c0.16718,-0.14744 0.26005,-0.34276 0.26005,-0.54816l0,-21.5926c-0.05144,-2.50643 -2.27761,-5.23969 -4.84956,-7.52937zm3.08634,28.34195l-24.47928,0l0,-30.89626l13.63421,0l0,0.00252c0.59441,-0.0315 1.10737,0.48642 1.50031,1.67095c0.35722,1.12783 0.44723,2.59842 0.44581,3.61788c0.00286,0.74727 -0.03858,1.2488 -0.03858,1.2488l-0.07001,0.82162l0.93733,0.00882c0.00429,0 2.16616,0.02268 4.28659,0.44735c2.03756,0.38812 3.63074,1.16185 3.77934,2.03766c0.00572,0.07813 0.00714,0.15626 0.00572,0.22935l0,20.81131l-0.00143,0z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#0C372C"/>
                  </g>
                </svg>
            </div>
            <div class="info" @click="onClose">
              <span  @click="goMyContent('/aboutme/myarticle')">
                <span>我的文章</span>
              </span>
            </div>
          </div>
      </div>
         </a-drawer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from "vue-router";
import {checkLogin} from "../store/checkLogin"
@Component
export default class NaveHeader extends Vue {
  placement = "bottom";
  searchValue = "";
  visible = false;
  isLogin = true;
  $router!: VueRouter;
  created(){
    this.$store.dispatch("login/whoAmIAction");
  }
  goMyContent(path){
    const cheResult =  checkLogin(this);
    const me = this.$store.state.login.user;
    if(cheResult){
      this.$router.push(path+"/"+me.userId);
    }
    return;
  }
  //  :to="'/aboutme/mypick/'+id"
  goMyPick(){
    if(this.$store.state.login.user){
      const id = this.$store.state.login.user.userId;
      if(this.$route.path == '/aboutme/mypick/'+id){
        return;
      }
      this.$router.push('/aboutme/mypick/'+id);
    }
  }
  onClose(){
    this.visible = false;
  }
  // 判断是否已经登录
  get isLoginFlag(){
    console.log(this.$store.state.login.user,"---user--login--info--");
    return this.$store.state.login.user;
  } 
  showDrawer(){
    this.visible = true;
  } 
  // 点击搜索按钮
  onSearch(value,event){
    if(value == ""){
      return;
    }
    if(this.$route.fullPath == "/search?cw="+value){
      return false;
    }
    this.$store.commit("search/setSpeed",true);
    this.$router.push("/search?cw="+value);
    this.searchValue = "";
  }
  get runcircleClass(){
    const speed = this.$store.state.search.speed;
    if(speed){
      return "log-other";
    }
    return "log-ico";
  }
}
</script>
// 头导航   log     首页  搜索  登录注册   创作中新   按钮(中等屏幕才会出现)
// 中等屏幕  首页消失  创作中心消失
// 小屏幕xs     4            12   4                     4
// 大屏幕下lg   4      2     10    4           4
<style  scoped>
    #user-img{
      margin: auto;
    }
    .header{
      background-color:rgba(255, 255, 255,.7);
      padding: 5px;
      font-size: 16px;
      font-weight: bold;
    }
    .title-list-hover{
      display: inline-block;
      cursor: pointer;
      transition:all .5s ease-in;
    }
    .title-active.router-link-active>span{
      font-size: 16px;
    }
    .title-list-hover:hover,.title-active{
      font-size: 20px;
      color: rgb(236, 240, 243);
      text-shadow:1px 1px 10px rgba(34, 32, 32, 0.7),2px 2px 10px rgba(34, 32, 32, 0.7),-1px -1px 10px rgba(20, 20, 20, 0.7), -2px -2px 10px rgba(3, 3, 3, 0.7)
    }
    .write-center{
      display: inline-block;
      cursor: pointer;
      border-radius: 10px;
      cursor: pointer;
      color: wheat;
      padding: 5px;
      background-image: linear-gradient(to left,red,blue);
    }
    .show-btn svg{
      cursor: pointer;
    }
     @keyframes icoRun {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
    }
    .log-ico svg{
       cursor: pointer;
       animation-name: icoRun;
       animation-duration: 1000ms;
       animation-timing-function: steps(360,end);
       animation-iteration-count: infinite;
    }
     .log-other svg{
       cursor: pointer;
       animation-name: icoRun;
       animation-duration: 360ms;
       animation-timing-function: steps(360,end);
       animation-iteration-count: infinite;
    }
    .sub-item{
      height: 50px;
      font-weight: bolder;
      margin: 15px 0px;
      border: 1px solid rgb(78, 76, 76);
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgb(12, 11, 11), 3px 3px 5px rgb(31, 30, 30), 4px 4px 5px rgb(95, 93, 93);
      cursor: pointer;
    }
    .user-info{
     display: flex;
     height: 100%;
     align-items: center;
    }
    .user-info .info{
      padding-left: 10px;
    }
    .user-info .poster img{
      height: 100%;
      width: 100%;
    }
    .user-info .poster{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .poster{
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
    .poster>div{
      height: 100%;
      width: 100%;
    }
    .poster img{
      height: 100%;
      width: 100%;
      cursor: pointer;
    }    
</style>