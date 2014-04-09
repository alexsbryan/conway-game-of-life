(function (root) {
	var Conway = root.Conway = (root.Conway || {});

	var Game = Conway.Game = function(canvas, width, height, startArray) {
		canvas.width = width
		canvas.height = height
		this.ctx = canvas.getContext("2d");
		this.width = width;
		this.length = height;
		this.box_size = 10;
		this.toKill = [];
		this.toMake = [];
		this.on_cells = []
		this.neighbors = []
		var new_board = new Conway.Board(this.width, this.length, this.box_size, this.ctx)
		this.board = new_board.init()
		this.addInitialLiving(startArray)
	};
	//
	// Game.prototype.addRandomInitialLiving = function () {
	// 	var r_seed = 100;
	// 	var x_c = this.width/this.box_size;
	// 	var y_c = this.length/this.box_size;
	// 	var rand_x = 0;
	// 	var rand_y = 0;
	//
	// 	for(var i=0; i<r_seed; i++){
	// 		rand_x = Math.floor(x_c*Math.random())
	// 		rand_y = Math.floor(y_c*Math.random())
	// 		this.board[rand_x][rand_y].isAlive = true
	// 		this.on_cells.push([rand_x,rand_y])
	// 	}
	// }

	Game.prototype.addInitialLiving = function (startArray) {
		for(var i=0; i<startArray.length; i++){
			this.board[startArray[i][0]][startArray[i][1]].isAlive = true
			this.on_cells.push(startArray[i])
		}
	};

	Game.prototype.start = function() {
		var that = this;
		for(var i = 0; i<this.on_cells.length; i++) {
			this.board[this.on_cells[i][0]][this.on_cells[i][1]].makeAlive()
		}
		this.interval = window.setInterval(function() {that.play()},5);
	};

	Game.prototype.play = function () {
		var neighbors = []
		var nextGen = []
		var seen = []

		for(var i = 0; i<this.on_cells.length; i++) {

			var x_c = this.on_cells[i][0];
			var y_c = this.on_cells[i][1];
			var tile = this.board[x_c][y_c]
			tile.board = this.board

			if(seen.indexOf(tile) === -1){
				seen.push(tile)
				neighbors = neighbors.concat(tile.neighbors())

				if(tile.alive(tile.isAlive)){
					nextGen.push([x_c,y_c])
					this.toMake.push([x_c,y_c])
				} else {
					this.toKill.push([x_c,y_c])
				}
			}
		}
		//check neighbors
			for(var i = 0; i<neighbors.length; i++){
				var coord = neighbors[i];
				var x_c = coord[0];
				var y_c = coord[1];
				var tile = this.board[x_c][y_c]
				tile.board = this.board


			if(seen.indexOf(tile) === -1){
				seen.push(tile)
				if(tile.alive(tile.isAlive)){
					nextGen.push([x_c,y_c])
					this.toMake.push([x_c,y_c])
				} else {
					this.toKill.push([x_c,y_c])
				}
			}
		}

			this.on_cells = nextGen

			for(var i=0; i<this.toMake.length; i++){
				var tile = this.board[this.toMake[i][0]][this.toMake[i][1]]
				tile.makeAlive()
				tile.isAlive = true
			}

			this.toMake = []

			for(var i=0; i<this.toKill.length; i++){
				var tile = this.board[this.toKill[i][0]][this.toKill[i][1]]
				tile.kill()
				tile.isAlive = false
			}
			this.toKill = []
	};
})(this);