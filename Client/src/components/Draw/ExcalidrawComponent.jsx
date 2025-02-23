import React, { useRef, useState, useEffect } from 'react'
import "../Draw/draw.css"
import { MdOutlineClose } from "react-icons/md";
import { NavLink } from 'react-router-dom';
export default function ExcalidrawComponent() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.7;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [color, lineWidth]);

    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    return (
        <div className='draw_components'>
            <div style={{ textAlign: "center" }}>
                <div className='close_ber_sec'>
                    <NavLink to={-1}>
                        <div className='close_ber_height'>
                            <MdOutlineClose className='close_icon_draw' />
                        </div>
                    </NavLink>
                </div>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{ border: "2px solid black", background: "#fff", cursor: "crosshair" }}
                />
                <br />
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(e.target.value)}
                />
                <button onClick={clearCanvas}>Clear</button>
            </div>
        </div>
    );
}
