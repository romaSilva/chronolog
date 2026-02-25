interface TagInputProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagInput({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: TagInputProps) {
  const handleAddClick = () => {
    onAddTag(tagInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddTag(tagInput);
    }
  };

  return (
    <div>
      <label htmlFor="tagInput">Tags</label>
      <div>
        <input
          id="tagInput"
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a tag"
        />
        <button type="button" onClick={handleAddClick}>
          Add Tag
        </button>
      </div>

      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <span key={tag}>
              {tag}
              <button type="button" onClick={() => onRemoveTag(tag)}>
                Remove
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
