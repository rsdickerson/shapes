

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        gray = new Color(0.5);
        wood = '#f6e8c3';
        medwood = '#f8f0d8';
        lightwood = '#fcf8ee';
 
 var canvasSize = this.view.size;
 var maxSize = Math.min(canvasSize.width, canvasSize.height);
 var center = this.view.center;
 
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'white';
        background.strokeColor = gray;
        background.strokeWidth = 10;
 

        var artLayer = new Layer();

 var path = new Path.Circle({
                            center: new Point(40, 700),
                            radius: 25,
                            fillColor: 'black'
                            });
 
 // When the mouse is clicked on the item,
 // set its fill color to red:
 path.onClick = function(event) {
 window.history.back();
 }
 var recRatio = 0.45;
 var cornerRatio = 0.05;
 var circleRatio = 0.4;
 var knobRatio = circleRatio * 0.5;
 
 var recSize = maxSize * recRatio;
 var cornerSize = recSize * cornerRatio;
 
        var topLeftCorner = center.subtract(recSize * 0.5, recSize * 0.5);
        var rectangle = new Rectangle(topLeftCorner, new Size(recSize,recSize));
        var path = new Path.Rectangle(rectangle, new Size(cornerSize, cornerSize));
        path.strokeColor = medwood;
        path.strokeWidth = 3;
        path.fillColor = wood;
        
        
        var puzzle = new Puzzle();
 
 var circleRadius = maxSize * circleRatio * 0.5;
 var knobRadius = circleRadius * knobRatio;
 
        var base = new Path.Circle(center, circleRadius);
        base.fillColor = lightwood;
        base.strokeWidth = 3;
        base.strokeColor = medwood;
        
 var pieceCenter = new Point(circleRadius + 10, circleRadius + 10);
        var path = new Path.Circle(pieceCenter, circleRadius);
        path.fillColor = 'blue';
        path.strokeWidth = 3;
        path.strokeColor = 'blue';
        path.strokeColor.alpha = 0.5;
        
        var knob = new Path.Circle(pieceCenter, knobRadius);
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

