

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        gray = new Color(0.5);
        wood = '#f6e8c3';
        medwood = '#f8f0d8';
        lightwood = '#fcf8ee';
        
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'white';
        background.strokeColor = gray;
        background.strokeWidth = 5;
        
        var artLayer = new Layer();
        
        var topLeftCorner = view.center.subtract([200,200]);
        var rectangle = new Rectangle(topLeftCorner, new Size(400,400));
        var cornerSize = new Size(10, 10);
        var path = new Path.Rectangle(rectangle, cornerSize);
        path.strokeColor = medwood;
        path.strokeWidth = 3;
        path.fillColor = wood;
        
        
        var puzzle = new Puzzle();
        
        var base = new Path.Circle(view.center, 150);
        base.fillColor = lightwood;
        base.strokeWidth = 3;
        base.strokeColor = medwood;
        
        var pieceCenter = new Point(200, 200);
        var path = new Path.Circle(pieceCenter, 150);
        path.fillColor = 'blue';
        path.strokeWidth = 3;
        path.strokeColor = 'blue';
        path.strokeColor.alpha = 0.5;
        
        var knob = new Path.Circle(pieceCenter, 30);
        knob.fillColor = medwood;
        knob.strokeWidth = 5;
        knob.strokeColor = lightwood;
        
        piece = new Group([path, knob]);
        
        puzzle.addPiece(new PuzzlePiece(piece, base));
        
        var tool = new Tool();
        tool.onMouseDown = function(event) { puzzle.onMouseDown(event); }
        tool.onMouseUp   = function(event) { puzzle.onMouseUp(event); }
        tool.onMouseMove = function(event) { puzzle.onMouseMove(event); }
        tool.onMouseDrag = function(event) { puzzle.onMouseDrag(event); }
        
        view.update();
    }
})();

