(function (root) {
	var Conway = root.Conway = (root.Conway || {});

	var Tile = Conway.Tile = function(coords, x_bound, y_bound, board, ctx, box_size) {
		this.coords = coords;
		this.x_c = coords[0];
		this.y_c = coords[1];
		this.vectors = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]]
		this.x_bound = x_bound;
		this.y_bound = y_bound;
		this.board = board;
		this.isAlive = false;
		this.ctx = ctx;
		this.box_size = box_size
	};

	Tile.prototype.init = function () {
		x_steps = Math.floor(this.width/this.box_size)
		board_arr = []
		for(var i=0; i<x_steps; i++) {
			board_arr.push([])
		}
		return board_arr
	};

	Tile.prototype.makeAlive = function () {
		this.ctx.fillStyle = "chartreuse";
		this.ctx.fillRect(this.x_c*this.box_size, this.y_c*this.box_size, this.box_size, this.box_size);
		this.isAlive = true
	};

	Tile.prototype.kill = function () {
		if(this.isAlive){
			this.ctx.fillStyle = "pink";
			this.ctx.fillRect(this.x_c*this.box_size, this.y_c*this.box_size, this.box_size, this.box_size);
			this.isAlive = false;
		}
	};

	Tile.prototype.neighbors = function () {
		var neighbors = []
		var x_step = (this.x_bound/this.box_size)
		var y_step = (this.y_bound/this.box_size)

		for(var i=0; i<this.vectors.length; i++){
			var neigh_x = ((this.vectors[i][0])+this.x_c)
			var neigh_y = ((this.vectors[i][1])+this.y_c)

			neigh_x = ((neigh_x%x_step) + x_step)%x_step
			neigh_y = ((neigh_y%y_step) + y_step)%y_step

			if(neigh_x<= this.x_bound && neigh_y <= this.y_bound && neigh_x >=0 && neigh_y >=0) {
					neighbors.push([neigh_x, neigh_y])
			}
		}
		return neighbors

	};

	Tile.prototype.alive = function (alreadyAlive) {
		var livingNeighbors = 0
		var allNeighbors = this.neighbors()

		for(var i = 0; i<allNeighbors.length; i++) {

			if(this.board[allNeighbors[i][0]][allNeighbors[i][1]].isAlive ===true){
				livingNeighbors +=1
			}
		}

		if(this.isAlive && livingNeighbors==2){
			return true
		} else if(livingNeighbors==3){
			return true
		} else {
			return false
		}

	};

})(this);