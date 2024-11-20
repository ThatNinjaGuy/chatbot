import React from "react";

function KnowledgeBase({
  knowledgeInput,
  handleKnowledgeInputChange,
  handleKnowledgeBaseAction,
  handleKeyDown,
}) {
  return (
    <div className="knowledge-base">
      <textarea
        value={knowledgeInput}
        onChange={handleKnowledgeInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter knowledge base text..."
        className="knowledge-input"
      />
      <button
        onClick={handleKnowledgeBaseAction}
        className="knowledge-action-button"
      >
        Update Knowledge Base
      </button>
    </div>
  );
}

export default KnowledgeBase;
