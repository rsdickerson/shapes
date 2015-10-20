
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

Puzzle.prototype.placePiece = function(piece) {
    //basePath = piece.basePath();
    //basePath.remove();
    //path = piece.path();
    //path.remove();
    //this.baseLayer().addChild(path);
    piece.placed = true;
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



