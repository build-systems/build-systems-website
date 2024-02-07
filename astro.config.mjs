import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.buildsystems.de/',
  integrations: [mdx(), svelte()],
  markdown: {
    shikiConfig: {
      theme: 'nord'
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank'
    }]]
  },
  output: "server",
  adapter: netlify()
});