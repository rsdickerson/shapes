// PUZZLE class ---------------

Puzzle = function(name) {
    this.hitOptions = {
    segments: true,
    stroke: true,
    fill:  true,
    tolerance: 5
    };
    
    this.pieces = new Array();
    this.selectedPiece = null;

    baseLayer = new Layer();
    this.baseLayerId = baseLayer.id;
    
    pieceLayer = new Layer();
    this.pieceLayerId = pieceLayer.id;
}

Puzzle.prototype.baseLayer = function() {
    return project.getItem({id: this.baseLayerId});
}

Puzzle.prototype.pieceLayer = function() {
    return project.getItem({id: this.pieceLayerId});
}

Puzzle.prototype.addPiece = function(piece) {
    this.pieces.push(piece);
    
    path = piece.path();
    basePath = piece.basePath();
    
    path.remove();
    this.pieceLayer().addChild(path);
    basePath.remove();
    this.baseLayer().addChild(basePath);
}

Puzzle.prototype.placeSelectedPiece = function() {
    if (this.selectedPiece) {
        this.selectedPiece.placed = true;
        this.selectedPiece = null;
    }
}

Puzzle.prototype.isSolved = function() {
    var arrayLength = this.pieces.length;
    for (var i = 0; i < arrayLength; i++) {
        if (!this.pieces[i].placed) {
            return false;
        }
    }
    return true;
}

Puzzle.prototype.onMouseDown = function(event) {
    var len = this.pieces.length;
    for (var ndx=0; ndx < len; ndx++) {
        if (!this.pieces[ndx].placed) {
            var hitResult = this.pieces[ndx].path().hitTest(event.point, this.hitOptions);
            if (hitResult) {
                this.selectedPiece = this.pieces[ndx];
                break;
            }
        }
    }
}

Puzzle.prototype.onMouseUp = function(event) {
    this.selectedPiece = null;
}

Puzzle.prototype.onMouseMove = function(event) {
}

Puzzle.prototype.onMouseDrag = function(event) {
    if (this.selectedPiece) {
        path = this.selectedPiece.path();
        path.translate(event.delta);
        if (this.selectedPiece.isAtBase()) {
            this.selectedPiece.snapPieceToBase();
            this.placeSelectedPiece();
            if (this.isSolved()) {
                background = project.layers[0].children[0];
                background.style = {
                fillColor: 'white',
                strokeColor: 'green',
                strokeWidth: 10
                };
            }
        }
    }
    
}


// PUZZLE PIECE class -----------------

PuzzlePiece = function(path, basePath) {
    this.pathId = path.id;
    this.basePathId = basePath.id;
    this.placed = false;
}

PuzzlePiece.prototype.path = function() {
    return project.getItem({id: this.pathId});
}

PuzzlePiece.prototype.basePath = function() {
    return project.getItem({id: this.basePathId});
}

PuzzlePiece.prototype.isAtBase = function() {
    return this.path().position.isClose(this.basePath().position, 5);
}

PuzzlePiece.prototype.isPlaced = function() {
    return this.placed;
}

PuzzlePiece.prototype.snapPieceToBase = function() {
    path = this.path();
    basePath = this.basePath();
    path.translate(basePath.position.subtract(path.position));
}



