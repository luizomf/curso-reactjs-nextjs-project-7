import { useSession } from 'next-auth/client';
import { gqlClient } from '../../../graphql/client';
import { GQL_MUTATION_UPDATE_POST } from '../../../graphql/mutations/post';
import { FormPost, StrapiPost } from '../../FormPost';
import { Wrapper } from '../../Wrapper';

export type UpdatePostTemplateProps = {
  post: StrapiPost;
};

export function UpdatePostTemplate({ post }: UpdatePostTemplateProps) {
  const [session] = useSession();

  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
    } catch (e) {
      alert('Erro ao salvar o post');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
  );
}
