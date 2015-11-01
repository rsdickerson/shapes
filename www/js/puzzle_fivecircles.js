

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        
        var palette = new Palette();
        
        var canvasSize = this.view.size;
        var maxSize = canvasSize.width;
        var center = new Point(this.view.center.x, this.view.center.y);
        
        
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'white';
        
        
        var artLayer = new Layer();
        
        var navbar = new Navbar();
        navbar.prevArrowOnClick = function(event) {
            window.location = "/threeCircles.html";
        }
        navbar.nextArrowOnClick = function(event) {
            window.location = "/singleCircle.html";
        }
        navbar.draw();
        
        var knobRadius = maxSize * 0.023;
        
        // Puzzle base (Ratio are based on knobRadius)
        var puzRatio = 10;
        var puzRadius = puzRatio * knobRadius;
 
        var puzBase = new Path.Circle(center, puzRadius);
        puzBase.strokeColor = palette.medwood;
        puzBase.strokeWidth = 3;
        puzBase.fillColor = palette.wood;
        
        var puzzle = new Puzzle();
        
        // Piece 1
        var p1Radius = puzRadius * 0.4;
        var p1Offset = p1Radius * 1.35;
        var p1Center = new Point(center.x, center.y - p1Offset);
        
        var p1Base = new Path.Circle(p1Center, p1Radius);
        p1Base.fillColor = palette.litewood;
        p1Base.strokeWidth = 3;
        p1Base.strokeColor = palette.medwood;
        
        var p1 = new Path.Circle(p1Center, p1Radius);
        p1.fillColor = 'red';
        p1.strokeWidth = 3;
        p1.strokeColor = 'red';
        p1.strokeColor.alpha = 0.5;
        
        var p1Knob = new Path.Circle(p1Center, knobRadius);
        p1Knob.fillColor = palette.medwood;
        p1Knob.strokeWidth = 5;
        p1Knob.strokeColor = palette.litewood;
        
        piece1 = new Group([p1, p1Knob]);
        puzzle.addPiece(new PuzzlePiece(piece1, p1Base));
        
        
        // Piece 2
        
        var p2Base = p1Base.clone();
        p2Base.scale(0.85);
        var p2Offset = p2Base.bounds.width * 0.87;
        p2Base.position = new Point(center.x - p2Offset, center.y + (p2Offset * 0.05));
        
        p2 = p1.clone();
        p2.scale(0.85);
        p2.fillColor = 'yellow';
        p2.strokeColor = 'yellow';
        p2.position = p2Base.position;
        
        p2Knob = p1Knob.clone();
        p2Knob.position = p2.position;
        
        piece2 = new Group(p2,p2Knob);
        puzzle.addPiece(new PuzzlePiece(piece2, p2Base));
        

        // Piece 3
        
        var p3Base = p1Base.clone();
        p3Base.scale(0.75);
        var p3Offset = p3Base.bounds.width * 1;
        p3Base.position = new Point(center.x - (p3Offset * 0.2), center.y + p3Offset);
        
        p3 = p1.clone();
        p3.scale(0.75);
        p3.fillColor = 'blue';
        p3.strokeColor = 'blue';
        p3.position = p3Base.position;
        
        p3Knob = p2Knob.clone();
        p3Knob.position = p3.position;
        
        piece3 = new Group(p3,p3Knob);
        puzzle.addPiece(new PuzzlePiece(piece3, p3Base));
        

        // Piece 4
        
        var p4Base = p1Base.clone();
        p4Base.scale(0.65);
        var p4Offset = p4Base.bounds.width * .99;
        p4Base.position = new Point(center.x + p4Offset, center.y + (p4Offset * 0.75));
        
        p4 = p1.clone();
        p4.scale(0.65);
        p4.fillColor = 'orange';
        p4.strokeColor = 'orange';
        p4.position = p4Base.position;
        
        p4Knob = p2Knob.clone();
        p4Knob.position = p4.position;
        
        piece4 = new Group(p4,p4Knob);
        puzzle.addPiece(new PuzzlePiece(piece4, p4Base));
        

        // Piece 5
        
        var p5Base = p1Base.clone();
        p5Base.scale(0.55);
        var p5Offset = p5Base.bounds.width * 1.5;
        p5Base.position = new Point(center.x + p5Offset, center.y - (p5Offset * 0.3));
        
        p5 = p1.clone();
        p5.scale(0.55);
        p5.fillColor = 'green';
        p5.strokeColor = 'green';
        p5.position = p5Base.position;
        
        p5Knob = p2Knob.clone();
        p5Knob.position = p5.position;
        
        piece5 = new Group(p5,p5Knob);
        puzzle.addPiece(new PuzzlePiece(piece5, p5Base));
        
        // Scramble the pieces
        piece1.position = new Point(p1.bounds.width * .6, p1.bounds.height * 2);
        piece2.position = new Point(canvasSize.width - p2.bounds.width * .6, p2.bounds.height * .6);
        piece3.position = new Point(canvasSize.width - p3.bounds.width * .6, p3.bounds.height * 3);
        piece4.position = new Point(p4.bounds.width * 1.5, p4.bounds.height * .6);
        piece5.position = new Point(p5.bounds.width * .6, p5.bounds.height * 1.5);

        var tool = new Tool();
        tool.onMouseDown = function(event) { puzzle.onMouseDown(event); }
        tool.onMouseUp   = function(event) { puzzle.onMouseUp(event); }
        tool.onMouseMove = function(event) { puzzle.onMouseMove(event); }
        tool.onMouseDrag = function(event) {
            puzzle.onMouseDrag(event);
        }
        
        
        view.update();
    }
})();

