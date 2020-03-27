<template>
  <div>
      <ScopedSlotDemo :url="website.url">
          <template v-slot="slotProps">
              {{slotProps.slotData.title}}
          </template>
      </ScopedSlotDemo>
  </div>
</template>

<script>
import ScopedSlotDemo from '../components/ScopedSlotDemo'
export default {
  name: '',
  components: {
    ScopedSlotDemo
  },
  props: {},
  data () {
    return {
      website: {
        url: 'http://wangEditor.com/',
        title: 'justdoit',
        subTitle: 'justdoit'
      }
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
