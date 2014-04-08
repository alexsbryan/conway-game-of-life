(function (root) {
	var Conway = root.Conway = (root.Conway || {});

	var Board = Conway.Board = function(b_width,b_length,box_size, ctx) {
		this.width = b_width;
		this.length = b_length;
		this.box_size = box_size;
		this.ctx = ctx
		this.init_draw()
	};

	Board.prototype.init = function () {
		x_steps = Math.floor(this.width/this.box_size)
		y_steps = Math.floor(this.length/this.box_size)
		board_arr = []
		for(var i=0; i<x_steps; i++) {
			board_arr.push([])
			for(var j =0; j < y_steps; j++) {
				board_arr[i][j] = (new Conway.Tile([i, j],this.width,this.length, this, this.ctx, this.box_size))
			}
		}

		return board_arr
	};

	Board.prototype.init_draw = function () {
			var bw = this.width;
			var bh = this.length;
			var gs = this.box_size;
			var p = 0;
			var cw = bw;
			var ch = bh;

		    for (var x = 0; x <= bw; x += gs) {
		        this.ctx.moveTo(x + p, p);
		        this.ctx.lineTo(x + p, bh + p);
		    }
		    for (var x = 0; x <= bh; x += gs) {
		        this.ctx.moveTo(p, x + p);
		        this.ctx.lineTo(bw + p, x + p);
		    }
		    this.ctx.strokeStyle = "black";
		    this.ctx.stroke();
	};
})(this);