<template>
  <div class="database-debug-interface container mx-auto px-4 py-6 space-y-6">
    <!-- 标题栏 -->
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">数据库调试面板</h1>
        <p class="text-muted-foreground">tRPC + Drizzle 数据操作测试工具</p>
      </div>
      <div class="flex items-center space-x-2">
        <Button @click="refreshData" :disabled="loading" variant="outline" size="sm">
          <Icon name="lucide:refresh-cw" :class="{ 'animate-spin': loading }" class="w-4 h-4 mr-2" />
          刷新
        </Button>
      </div>
    </header>

    <!-- 状态区域 -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- 连接状态 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-medium flex items-center">
            <div :class="[
              'w-2 h-2 rounded-full mr-2',
              connectionStatus.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            ]"></div>
            数据库连接
          </CardTitle>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="space-y-1">
            <p class="text-sm text-muted-foreground">
              状态: {{ connectionStatus.status === 'connected' ? '已连接' : '连接失败' }}
            </p>
            <p v-if="connectionStatus.status === 'connected'" class="text-xs text-muted-foreground">
              最后检查: {{ formatTime(connectionStatus.timestamp) }}
            </p>
            <p v-else class="text-xs text-destructive">
              {{ connectionStatus.message }}
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- 统计信息 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-medium">数据统计</CardTitle>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-muted-foreground">总记录</p>
              <p class="font-semibold">{{ stats.totalRecords }}</p>
            </div>
            <div>
              <p class="text-muted-foreground">活跃</p>
              <p class="font-semibold text-green-600">{{ stats.activeRecords }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 快速操作 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-medium">快速操作</CardTitle>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="flex flex-wrap gap-2">
            <Button @click="showCreateDialog = true" variant="default" size="sm">
              <Icon name="lucide:plus" class="w-4 h-4 mr-1" />
              新建
            </Button>
            <Button @click="clearAllRecords" variant="destructive" size="sm">
              <Icon name="lucide:trash-2" class="w-4 h-4 mr-1" />
              清空
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>

    <!-- 数据表格区域 -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>调试记录</CardTitle>
          <div class="flex items-center space-x-2">
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索标题..."
                class="pl-9 w-64"
                v-model="searchQuery"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <!-- 数据表格 -->
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-16">ID</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead class="w-24">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell colspan="7" class="text-center py-8">
                  <div class="flex items-center justify-center space-x-2">
                    <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
                    <span>加载中...</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow v-else-if="filteredRecords.length === 0">
                <TableCell colspan="7" class="text-center py-8 text-muted-foreground">
                  暂无数据
                </TableCell>
              </TableRow>
              <TableRow v-for="record in filteredRecords" :key="record.id">
                <TableCell class="font-medium">{{ record.id }}</TableCell>
                <TableCell>{{ record.title }}</TableCell>
                <TableCell class="max-w-xs truncate">{{ record.description || '-' }}</TableCell>
                <TableCell>
                  <Badge :variant="record.status === 'active' ? 'default' : 'secondary'">
                    {{ record.status === 'active' ? '活跃' : '非活跃' }}
                  </Badge>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatTime(record.createdAt) }}
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatTime(record.updatedAt) }}
                </TableCell>
                <TableCell>
                  <div class="flex items-center space-x-1">
                    <Button @click="editRecord(record)" variant="ghost" size="sm">
                      <Icon name="lucide:edit" class="w-4 h-4" />
                    </Button>
                    <Button @click="deleteRecord(record.id)" variant="ghost" size="sm">
                      <Icon name="lucide:trash" class="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- 创建/编辑对话框 -->
    <Dialog v-model:open="showCreateDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingRecord ? '编辑记录' : '新建记录' }}</DialogTitle>
          <DialogDescription>
            {{ editingRecord ? '修改调试记录信息' : '创建新的调试记录' }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="saveRecord" class="space-y-4">
          <div class="space-y-2">
            <Label for="title">标题</Label>
            <Input
              id="title"
              v-model="formData.title"
              placeholder="输入标题..."
              required
              maxlength="255"
            />
          </div>
          <div class="space-y-2">
            <Label for="description">描述</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="输入描述..."
              rows="3"
            />
          </div>
          <div class="space-y-2">
            <Label for="status">状态</Label>
            <Select v-model="formData.status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="closeDialog">
              取消
            </Button>
            <Button type="submit" :disabled="submitting">
              {{ submitting ? '保存中...' : '保存' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- 消息提示 -->
    <div v-if="message" class="fixed bottom-4 right-4 z-50">
      <div :class="[
        'p-4 rounded-lg shadow-lg border max-w-sm',
        message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
        message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
        'bg-blue-50 border-blue-200 text-blue-800'
      ]">
        <div class="flex items-center space-x-2">
          <Icon :name="message.type === 'success' ? 'lucide:check-circle' :
                       message.type === 'error' ? 'lucide:x-circle' : 'lucide:info'"
                 class="w-5 h-5" />
          <span class="text-sm font-medium">{{ message.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DebugRecord } from "~/server/lib/schema";

// 响应式数据
const loading = ref(false);
const submitting = ref(false);
const records = ref<DebugRecord[]>([]);
const connectionStatus = ref({
  status: "disconnected" as "connected" | "error",
  timestamp: "",
  message: "",
});
const stats = ref({
  totalRecords: 0,
  activeRecords: 0,
  inactiveRecords: 0,
  lastUpdated: null as Date | null,
});

// 搜索和筛选
const searchQuery = ref("");

// 对话框状态
const showCreateDialog = ref(false);
const editingRecord = ref<DebugRecord | null>(null);

// 表单数据
const formData = ref({
  title: "",
  description: "",
  status: "active",
});

// 消息提示
const message = ref<{
  type: "success" | "error" | "info";
  text: string;
} | null>(null);

// tRPC 客户端
const $trpc = useTRPC();

// 计算属性
const filteredRecords = computed(() => {
  if (!searchQuery.value) return records.value;
  const query = searchQuery.value.toLowerCase();
  return records.value.filter(
    (record) =>
      record.title.toLowerCase().includes(query) ||
      (record.description && record.description.toLowerCase().includes(query))
  );
});

// 方法
const loadData = async () => {
  try {
    loading.value = true;

    // 并行加载数据
    const [recordsResult, statsResult, connectionResult] = await Promise.all([
      $trpc.debug.getRecords.query(),
      $trpc.debug.getStats.query(),
      $trpc.debug.checkConnection.query(),
    ]);

    if (recordsResult.success) {
      records.value = recordsResult.data;
    }

    if (statsResult.success) {
      stats.value = statsResult.data;
    }

    connectionStatus.value = connectionResult;
  } catch (error) {
    console.error("加载数据失败:", error);
    showMessage("加载数据失败", "error");
  } finally {
    loading.value = false;
  }
};

const refreshData = () => {
  loadData();
};

const editRecord = (record: DebugRecord) => {
  editingRecord.value = record;
  formData.value = {
    title: record.title,
    description: record.description || "",
    status: record.status,
  };
  showCreateDialog.value = true;
};

const deleteRecord = async (id: number) => {
  if (!confirm("确定要删除这条记录吗？")) return;

  try {
    const result = await $trpc.debug.deleteRecord.mutate({ id });

    if (result.success) {
      showMessage("删除成功", "success");
      await loadData();
    } else {
      showMessage(result.error || "删除失败", "error");
    }
  } catch (error) {
    console.error("删除记录失败:", error);
    showMessage("删除记录失败", "error");
  }
};

const saveRecord = async () => {
  try {
    submitting.value = true;

    let result;
    if (editingRecord.value) {
      // 更新记录
      result = await $trpc.debug.updateRecord.mutate({
        id: editingRecord.value.id,
        ...formData.value,
      });
    } else {
      // 创建记录
      result = await $trpc.debug.createRecord.mutate(formData.value);
    }

    if (result.success) {
      showMessage(editingRecord.value ? "更新成功" : "创建成功", "success");
      closeDialog();
      await loadData();
    } else {
      showMessage(result.error || "操作失败", "error");
    }
  } catch (error) {
    console.error("保存记录失败:", error);
    showMessage("保存记录失败", "error");
  } finally {
    submitting.value = false;
  }
};

const clearAllRecords = async () => {
  if (!confirm("确定要清空所有记录吗？此操作不可恢复！")) return;

  try {
    const result = await $trpc.debug.clearAll.mutate();

    if (result.success) {
      showMessage("清空成功", "success");
      await loadData();
    } else {
      showMessage(result.error || "清空失败", "error");
    }
  } catch (error) {
    console.error("清空记录失败:", error);
    showMessage("清空记录失败", "error");
  }
};

const closeDialog = () => {
  showCreateDialog.value = false;
  editingRecord.value = null;
  formData.value = {
    title: "",
    description: "",
    status: "active",
  };
};

const showMessage = (text: string, type: "success" | "error" | "info") => {
  message.value = { type, text };
  setTimeout(() => {
    message.value = null;
  }, 3000);
};

const formatTime = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 生命周期
onMounted(() => {
  loadData();

  // 设置定时刷新
  const interval = setInterval(() => {
    loadData();
  }, 30000); // 30秒刷新一次

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>