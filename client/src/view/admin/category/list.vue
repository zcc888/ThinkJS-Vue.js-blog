<template>
    <Table border  :loading="loading" :columns="columns" :data="data"></Table>
</template>
<script>
import { category } from "@/api";
export default {
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "缩略名",
          key: "slug"
        },
        {
          title: "分类描述",
          key: "description"
        },
        {
          title: "排序",
          width: 100,
          align: "center",
          key: "sort"
        },
        {
          title: "文章数量",
          key: "count",
          width: 100,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/admin/category/save",
                        query: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      if (confirm("确定要删除吗？")) {
                        this.delete(params.row.id, params.index);
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    get() {
      category.getList().then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    delete(id) {
      category.delete(id).then(res => {
        this.data.splice(index, 1);
      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>