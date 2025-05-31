<template>
 <div :class="['overflow-hidden rounded-lg', aspectRatioClass, className]">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="w-full h-full"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'YouTubeEmbed',
  props: {
    videoId: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: String,
      default: '16:9',
      validator: value => ['16:9', '4:3', '21:9', '1:1'].includes(value),
    },
    title: {
      type: String,
      default: 'YouTube video',
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    aspectRatioClass() {
      const aspectRatioClasses = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-4/3',
        '21:9': 'aspect-21/9',
        '1:1': 'aspect-square',
      }
      return aspectRatioClasses[this.aspectRatio]
    },
  },
}
</script>