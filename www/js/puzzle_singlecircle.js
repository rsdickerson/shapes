

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'green';
        background.strokeColor = 'red';
        background.strokeWidth = 5;
        
        var artLayer = new Layer();
        
        var rectangle = new Rectangle(new Point(400, 200), new Size(400,400));
        var cornerSize = new Size(10, 10);
        var path = new Path.Rectangle(rectangle, cornerSize);
        path.strokeColor = 'yellow';
        path.fillColor = 'yellow'
        
        
        var puzzle = new Puzzle();
        
        var base = new Path.Circle(new Point(600, 400), 150);
        base.fillColor = 'white';
        
        var path = new Path.Circle(new Point(200, 200), 150);
        path.fillColor = 'red';
        
        //point = new Point(100,0);
        //path.translate(point);
        
        puzzle.addPiece(new PuzzlePiece(path, base));
        
        var tool = new Tool();
        
        tool.onMouseDown = function(event) {
            var hitResult = project.hitTest(event.point, puzzle.hitOptions);
            
            if (hitResult) {
                if (hitResult.item instanceof Path) {
                    path = hitResult.item;
                    var len = puzzle.pieces.length;
                    for (var ndx=0; ndx < len; ndx++) {
                        if (puzzle.pieces[ndx].pathId == path.id && !puzzle.pieces[ndx].placed) {
                            puzzle.selectedPiece = puzzle.pieces[ndx];
                            break;
                        }
                    }
                }
            }
        }
        
        tool.onMouseUp = function(event) {
            puzzle.selectedPiece = null;
        }
        
        tool.onMouseMove = function(event) {
        }
        
        tool.onMouseDrag = function(event) {
            if (puzzle.selectedPiece) {
                path = puzzle.selectedPiece.path();
                path.translate(event.delta);
                if (puzzle.selectedPiece.isAtBase()) {
                    puzzle.selectedPiece.snapPieceToBase();
                    puzzle.placePiece(puzzle.selectedPiece);
                    if (puzzle.isSolved()) {
                        background = project.layers[0].children[0];
                        background.style = {
                        fillColor: 'blue',
                        strokeColor: 'red',
                        strokeWidth: 5
                        };
                    }
                }
            }
            
        }
        
        view.update();
    }
})();

