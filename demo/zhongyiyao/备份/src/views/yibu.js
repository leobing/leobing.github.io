function sleep(t) {
    return new Promise((resolve, reject) => {
    		for(let i=0; i<t; i++){
    			setTimeout(function () {
    				console.log(i);
    			}, 5000);
    		}
		            resolve();
    });
}

(async function test() {
        await sleep(10);
        // console.log(1);
})();