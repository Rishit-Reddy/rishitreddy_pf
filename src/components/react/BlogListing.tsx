import { useState, useMemo } from "react"
import BlogSearchBar from "@/components/react/BlogSearchBar"
import BlogCard from "@/components/react/BlogCard"

interface BlogPost {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    publishedDate?: string;
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
    featured?: boolean;
  };
}

interface BlogListingProps {
  posts: BlogPost[];
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    return posts.filter(post => 
      post.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.fields.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  // Separate featured and regular posts
  const featuredPosts = useMemo(() => 
    filteredPosts.filter(post => post.fields.featured), 
    [filteredPosts]
  );
  
  const regularPosts = useMemo(() => 
    filteredPosts.filter(post => !post.fields.featured), 
    [filteredPosts]
  );

  return (
    <div className="py-8">
      {/* Hero Section with Search */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about technology, development, and everything in between.
        </p>
        
        {/* Search Bar */}
        <BlogSearchBar onSearch={setSearchQuery} />
      </div>

      {/* Show results count when searching */}
      {searchQuery.trim() && (
        <div className="mb-8">
          <p className="text-muted-foreground">
            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
            {searchQuery.trim() && ` for "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* Featured Section */}
      {featuredPosts.length > 0 && !searchQuery.trim() && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.fields.slug} post={post} variant="square" />
            ))}
          </div>
        </section>
      )}

      {/* All Articles Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {!searchQuery.trim() ? 'All Articles' : 'Search Results'}
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery.trim() 
                ? `No articles found for "${searchQuery}"`
                : 'No articles published yet.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {(searchQuery.trim() ? filteredPosts : regularPosts).map((post) => (
              <BlogCard key={post.fields.slug} post={post} variant="horizontal" />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
