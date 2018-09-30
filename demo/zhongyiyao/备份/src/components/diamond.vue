<template>
	<div class="dia">
		<div class="tit">
			<slot name="tit"></slot>
		</div>
		<div>
			<slot name="con"></slot>
		</div>
	</div>
</template>

<style scoped>
	.dia{background-color:#fff;padding:10px 20px;margin:0 5px;height:auto;margin-bottom:5px;}
	.tit{font-size:16px;margin-bottom:10px;}
	.tit:before{margin-right:6px;display:inline-block;content:'';width:3px;height:18px;background-color:green;vertical-align:-3px;}
</style>
