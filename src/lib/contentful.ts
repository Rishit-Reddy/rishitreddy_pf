import { createClient } from 'contentful';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

// Define types for better type safety
interface Asset {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details?: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  body: any; // Rich text document
  hero_Image?: {
    fields: {
      image: Asset;
      altName?: string;
    };
  };
}

interface ProjectFields {
  title: string;
  slug: string;
  excerpt: string;
  technologies?: string[];
  projectType?: string;
  projectCategory?: string;
  institution?: string;
  inProgress?: boolean;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  body: any; // Rich text document for detailed project description
  hero_Image?: {
    fields: {
      image: Asset;
      altName?: string;
    };
  };
}

const client = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  environment: env.CONTENTFUL_ENVIRONMENT || 'master'
});

export async function getBlogPosts() {
  const entries = await client.getEntries({ content_type: 'blogPost', include: 2 });
  return entries.items as unknown as Array<{ fields: BlogPostFields }>;
}

export async function getPostBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
    include: 3 // Increase include level to resolve more references
  });
  
  const post = entries.items[0];
  if (!post) return undefined;
  
  return post as unknown as { fields: BlogPostFields } | undefined;
}

export async function getProjects() {
  const entries = await client.getEntries({ 
    content_type: 'project', 
    include: 2
  });
  return entries.items as unknown as Array<{ fields: ProjectFields }>;
}

export async function getProjectBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'project',
    'fields.slug': slug,
    limit: 1,
    include: 3 // Increase include level to resolve more references
  });
  
  const project = entries.items[0];
  if (!project) return undefined;
  
  return project as unknown as { fields: ProjectFields } | undefined;
}