import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const LayoutBuilder = () => {
  const [partitions, setPartitions] = useState([
    { id: 1, color: generateRandomColor(), width: 100, height: 100, parent: null }
  ]);

  const splitPartition = (id, direction) => {
    setPartitions((prevPartitions) => {
      const index = prevPartitions.findIndex(part => part.id === id);
      const newPartition = {
        id: prevPartitions.length + 1,
        color: generateRandomColor(),
        width: prevPartitions[index].width,
        height: prevPartitions[index].height,
        parent: id
      };

      if (direction === 'V') {
        newPartition.width /= 2;
        prevPartitions[index].width /= 2;
      } else {
        newPartition.height /= 2;
        prevPartitions[index].height /= 2;
      }

      return [...prevPartitions, newPartition];
    });
  };

  const removePartition = (id) => {
    setPartitions((prevPartitions) => prevPartitions.filter(part => part.id !== id && part.parent !== id));
  };

  const updatePartitionSize = (id, size) => {
    setPartitions((prevPartitions) => 
      prevPartitions.map(part => part.id === id ? { ...part, ...size } : part)
    );
  };

  return (
    <div className="layout-builder">
      {partitions.map(partition => (
        <ResizableBox
          key={partition.id}
          width={partition.width}
          height={partition.height}
          minConstraints={[50, 50]}
          onResizeStop={(e, data) => updatePartitionSize(partition.id, { width: data.size.width, height: data.size.height })}
          className="partition"
          style={{ backgroundColor: partition.color }}
        >
          <div className="controls">
            <button onClick={() => splitPartition(partition.id, 'V')}>V</button>
            <button onClick={() => splitPartition(partition.id, 'H')}>H</button>
            {partition.parent !== null && <button onClick={() => removePartition(partition.id)}>-</button>}
          </div>
        </ResizableBox>
      ))}
    </div>
  );
};

export default LayoutBuilder;