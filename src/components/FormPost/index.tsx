import React, { useState } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type FormPostProps = {
  onSave?: (post: StrapiPost) => Promise<void>;
  post?: StrapiPost;
};

export const FormPost = ({ post, onSave }: FormPostProps) => {
  const { title = '', content = '', id = '' } = post || {};
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setSaving(true);
    event.preventDefault();

    const newPost = { id, title: newTitle, content: newContent };

    if (onSave) {
      await onSave(newPost);
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="post-title"
        label="Post title"
        value={newTitle}
        onInputChange={(v) => setNewTitle(v)}
      />
      <TextInput
        name="post-title"
        label="Post title"
        value={newContent}
        onInputChange={(v) => setNewContent(v)}
        as="textarea"
      />
      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
