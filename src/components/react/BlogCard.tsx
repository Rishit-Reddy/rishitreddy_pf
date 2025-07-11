interface BlogPost {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    publishedDate?: string;
    tags?: string[];
    hero_Image?: {
      fields: {
        image: {
          fields: {
            file: {
              url: string;
            };
            title?: string;
            description?: string;
          };
        };
        altName?: string;
      };
    };
  };
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'square' | 'horizontal';
}

export default function BlogCard({ post, variant = 'square' }: BlogCardProps) {
  const { title, slug, excerpt, publishedDate, hero_Image, tags } = post.fields;

  if (variant === 'horizontal') {
    return (
      <a href={`/blog/${slug}`} className="block group">
        <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer">
          <div className="flex flex-col sm:flex-row h-auto sm:h-64">
            {/* Hero Image */}
            {hero_Image?.fields?.image?.fields?.file?.url && (
              <div className="sm:w-1/3 aspect-video sm:aspect-auto sm:h-64 overflow-hidden flex-shrink-0">
                <img
                  src={`https:${encodeURI(hero_Image.fields.image.fields.file.url)}`}
                  alt={hero_Image.fields.altName || hero_Image.fields.image.fields.title || title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {title}
                </h2>
                
                {excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm">
                    {excerpt}
                  </p>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                {publishedDate && (
                  <time className="text-sm text-muted-foreground">
                    {new Date(publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                
                <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-200">
                  Read more →
                </span>
              </div>
            </div>
          </div>
        </article>
      </a>
    )
  }

  // Square variant (default for featured posts)
  return (
    <a href={`/blog/${slug}`} className="block group">
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer">
        {/* Hero Image */}
        {hero_Image?.fields?.image?.fields?.file?.url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`https:${encodeURI(hero_Image.fields.image.fields.file.url)}`}
              alt={hero_Image.fields.altName || hero_Image.fields.image.fields.title || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
          
          {excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            {publishedDate && (
              <time className="text-sm text-muted-foreground">
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            
            <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-200">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </a>
  )
}
