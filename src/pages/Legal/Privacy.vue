<template>
  <section v-fade-in-up="{ delay: 500 }" class="container bg-white py-12">
    <header class="mb-8 text-center flex flex-col items-center justify-center space-y-[30px]">
      <h1 class="text-[56px] font-bold text-black">隐私协议</h1>
      <div class="w-[100px] h-[3px] bg-black"></div>
      <div>
        <p class="text-gray-600 mt-2">更新日期：2025 年 10 月 30 日</p>
        <p class="text-gray-600 mt-2">生效日期：2025 年 10 月 30 日</p>
      </div>
    </header>
    <article class="bg-white text-gray-800 leading-relaxed space-y-6 policy-body">
      <p>
        感谢您使用喵呜软件，本应用由嗷呜世界（深圳）网络科技有限公司（以下简称“本司”）提供服务，应用尊重并保护所有使用服务的用户个人隐私权。为了给您提供更好的服务，本应用会按照本隐私政策的规定使用和披露您的个人信息。我们将以高度的勤勉、审慎义务对待这些信息。除本隐私政策相关规定外，在未得到您允许的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不定时更新隐私政策。您在同意本应用服务使用协议之时，即视为您已经同意本隐私政策全部内容，本隐私政策属于本应用服务使用协议不可分割的一部分。本隐私政策将帮助您了解在使用本应用的过程中可能涉及的内容，请您在使用我们的产品（或服务）前，请您仔细阅读以下内容：
      </p>

      <ul class="list-none space-y-1">
        <li>一、人脸数据政策</li>
        <li>二、我们如何收集和使用您的个人信息</li>
        <li>三、信息披露</li>
        <li>四、信息存储和交换</li>
        <li>五、Cookie 的使用</li>
        <li>六、信息安全</li>
        <li>七、本隐私政策的更改</li>
        <li>八、儿童隐私相关</li>
        <li>九、用户如何管理信息</li>
        <li>十、知识产权相关</li>
        <li>十一、法律责任与免责申明</li>
        <li>十二、联系我们</li>
      </ul>

      <p>
        本隐私政策与本软件以及本软件所包括的各种业务功能紧密，我们将按照本隐私政策收集、存储、使用及对外提供您的信息。因此请您务必审慎阅读、充分理解本政策全部内容，特别是以下划线、加粗等方式标注与您的权益存在或可能存在重大关系的部分，以帮助您了解维护自己隐私及个人信息的方式，做出您认为适当的选择。您点击类似“同意”按钮后或进行主动勾选同意本隐私政策等操作后，即表示您已同意喵呜应用按照本隐私政策来收集、存储、使用及对外提供您的个人信息。
      </p>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">一、人脸数据政策</h2>
        <h3 class="font-medium">（一）人脸数据数据的收集目的与处理流程</h3>
        <p>
          为了实现您的专属的AI智能体在视觉上符合您的形象，<text class="font-bold"
            >我们在对图片处理时会找出图片中人脸的特征，如眼睛、鼻子、嘴巴等以进行人脸处理。一方面尽可能提升形象的相似度，另外一方面我们需要驱动形象的说话动作，需要图片中形象的画面范围。</text
          >所以会根据脸部区域对图片进行裁剪。以上是我们对人脸数据分析的目的。处理流程如下：
        </p>
        <ol class="list-decimal pl-6 space-y-1">
          <li>
            将您通过拍照/相册选择等方式确认选择的照片，上传到服务器。上传过程我们采用了 https
            的方式保障了数据的安全性。
          </li>
          <li>
            服务器收到数据后将分析照片中人脸的信息，结合您选择的模版，合成对应的新的形象，期间将对人脸的数据进行处理包括，人脸识别、裁剪、融合等一系列处理。
          </li>
          <li>
            合成图片完成后，将新合成的图片返回到应用，即您看到的图片。你可以选择使用照片构建形象，也可以保存到您的相册，如果不满意可以重新构建，我们将删除不没有构建形象的多余照片信息。
          </li>
          <li>
            在您选择将合成的照片进行下一步构建AI智能体时，我们将在服务器存储当前照片信息，直到您下次重新构建之前。您上传的原始照片信息我们将删除相关文件。
          </li>
        </ol>
        <h3 class="font-medium">（二）人脸数据的存储策略与安全措施</h3>
        <p>
          所有在图片上传以及过程处理中，我们通过加密来保障数据的安全性，同时，我们承诺不会将您的图片信息与任何第三方共享您的人脸数据，也不会永久存储您提交的任何人脸信息，分析过程结束后您上传的原始图片将会被删除。合成的图片也将在您下次重新构建时被删除，仅在您当前形象使用过程中保存。
        </p>
        <h3 class="font-medium">（三）特别说明</h3>
        <p>
          在形象构建过程中，我们将尽可能保护您的个人隐私安全，从数据的安全以及存存储和共享都将保障您的个人隐私安全，同时也请确保您上传的照片不包含其他个人隐私信息。上传的照片不侵犯他人的著作权、肖像权等合法权益，尊重他人的隐私。如有违反我们将有权不作通知的情况删除你上传的相关信息。
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">二、我们如何收集和使用您的个人信息</h2>
        <p>
          个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。如我们收集、使用的信息涉及您的个人敏感信息的，我们将用加粗字体突出显示以向您明确标识。同时，我们将采取加密等安全措施传输和存储您的个人敏感信息。如果您公开发布的信息中涉及敏感信息、他人信息，请谨慎选择及考虑。若您公开发布的信息中涉及未成年人个人信息的，您需要在发布前征得对应未成年人的监护人同意。我们将您的个人信息用于本政策未载明的其他用途或目的时，会事先征求您的同意。
        </p>
        <p>
          为了实现我们的产品、服务的核心功能，我们可能会收集、保存和使用下列与您有关的信息。如果您不提供相关信息，我们将无法为您提供相应的产品或服务。这些功能和信息内容如下
        </p>
        <h3 class="font-medium">（一）保障登录/支付安全所必须的功能</h3>
        <p>
          当你注册、登录喵呜及使用相关服务时，<text class="font-bold"
            >你可以通过手机号码创建账号，并且你可以完善相关的网络身份识别信息（性别、昵称、密码），我们收集这些信息是为了帮助你完成注册。收集手机号码是履行国家法律法规关于网络实名制（真实身份信息认证）要求的必要信息，</text
          >如果你拒绝提供手机号码用于注册、登录，我们可能无法为你提供应用完整功能。
        </p>
        <p>
          为保障您使用我们的产品与/或服务时系统的稳定性和安全性，防止您的个人信息被非法获取，更准确地预防欺诈和保护账号安全，<text
            class="font-bold"
            >我们需要收集您的设备信息（设备唯一 ID、MAC
            地址、IMEI、OAID、AndroidID）等来判断您的账号登录风险，我们会用上述信息排查可能存在的系统风险、安全风险和信息异常。</text
          >如果您不提供上述信息，我们无法对您的账号安全及账号权益进行保护。
        </p>
        <h3 class="font-medium">（二）保存图片到您的本地</h3>
        <p>
          在您需要下载图片时，我们会申请访问您的相机/相册访问与存储权限，如您拒绝提供仅会使您无法使用该功能，但并不影响您正常使用产品与/或服务的其他功能。同时您也可以随时在手机设置中关闭相关权限。
        </p>
        <h3 class="font-medium">（三）收录声音转义成文字</h3>
        <p>
          当您使用应用内的语音键进行说话时，会开启您的麦克风权限用于录音，并通过第三方 sdk
          转义成文字形式，用于发送内容。
        </p>
        <h3 class="font-medium">（四）合作接入的第三方获取的相关信息</h3>
        为保障本应用内功能的实现和稳定运行，我们可能接入由其他第三方提供的软件开发包（SDK）、应用程序接口（API）等代码或通过合作方式，以实现相关目的。具体合作方及其可能获取相关信息。我们会对获取信息的合作方的代码进行严格安全检测，以保护数据安全。请注意，合作方的代码可能因其版本升级、策略调整原因导致数据处理类型存在变化，请以其公示的官网说明为准。<text
          class="font-bold"
          >我们接入的第三方 SDK
          主要服务于您以及其他的用户的需求，因此在满足新的服务需求及业务功能变更时，我们可能会调整我们接入的第三方
          SDK。我们会及时在本说明中向您公开说明接入第三方 SDK 的最新情况。目前应用接入的第三方 SDK
          列明如下：</text
        >
        <!-- table表：左侧为行表头（label），右侧为具体值（value） -->
        <table class="w-full text-left border border-gray-300">
          <tbody>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 名称
              </th>
              <td class="px-4 py-2 border border-gray-300">微信 SDK</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                服务商
              </th>
              <td class="px-4 py-2 border border-gray-300">深圳市腾讯计算机系统有限公司</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                使用目的
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <div>为应用提供分享到微信的能力</div>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>微信分享时收集并向微信应用传输喵呜应用中用户主动选择的图片或内容</li>
                  <li>
                    特别说明，在 Android
                    系统中微信会验证用户设备上安装微信应用的状态，用于确认该设备是否能够实现 Open
                    SDK 的相关能力，如设备上未安装微信应用，用户将无法使用微信 Open SDK
                    能力所实现的相关功能。
                  </li>
                  <li>
                    如用户使用 iOS 系统，为了在 iOS 系统设备中实现前述 2
                    相关功能在不同设备下的表现适配，微信会收集用户的设备型号信息并保存在设备本地。
                  </li>
                  <li>
                    如用户使用 iOS 系统，为了在 iOS 系统中实现前述 1、2
                    相关功能所涉及的第三方应用与微信应用之间的信息传输，我们需调用 iOS
                    的剪切板权限，并在剪切板中写入、读取上述相关信息。
                  </li>
                </ol>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                收集个人信息类型
              </th>
              <td class="px-4 py-2 border border-gray-300">
                使用的系统权限：剪切板权限，查看应用列表权限
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 政策链接
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <a
                  href="https://support.weixin.qq.com/cgi-bin/mmsupportacctnodeweb-bin/pages/RYiYJkLOrQwu0nb8"
                  target="_blank"
                  rel="noopener"
                  class="text-primary-600 hover:underline break-all"
                >
                  https://support.weixin.qq.com/cgi-bin/mmsupportacctnodeweb-bin/pages/RYiYJkLOrQwu0nb8
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bugly SDK 表：左侧为行表头（label），右侧为具体值（value） -->
        <table class="w-full text-left border border-gray-300 mt-6">
          <tbody>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 名称
              </th>
              <td class="px-4 py-2 border border-gray-300">腾讯 Bug 异常上报 SDK</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                服务商
              </th>
              <td class="px-4 py-2 border border-gray-300">深圳市腾讯计算机系统有限公司</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                使用目的
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <div>为应用提供上报应用故障的日志信息能力，帮助开发者快速定位用户应用故障</div>
                <div class="mt-2">
                  【Android】 手机型号、手机品牌、Android 系统版本、Android 系统 api
                  等级、厂商系统版本、CPU 架构类型、设备是否 root、磁盘空间占用大小、sdcard
                  空间占用大小、内存空间占用大小、网络类型、运行中的进程
                </div>

                <div class="mt-3">
                  【iOS】 设备型号、操作系统版本、操作系统内部版本号、Wi-Fi 状态、CPU
                  属性、内存剩余空间、磁盘空间、磁盘剩余空间、运行时手机状态（进程所占内存、虚拟内存等）、idfv、是否越狱、地区编码
                </div>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                收集个人信息类型
              </th>
              <td class="px-4 py-2 border border-gray-300">
                使用的系统权限：剪切板权限，查看应用列表权限
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 政策链接
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <a
                  href="https://privacy.qq.com/document/preview/fc748b3d96224fdb825ea79e132c1a56"
                  target="_blank"
                  rel="noopener"
                  class="text-primary-600 hover:underline break-all"
                >
                  https://privacy.qq.com/document/preview/fc748b3d96224fdb825ea79e132c1a56
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Baidu 语音识别 SDK 表：左侧为行表头（label），右侧为具体值（value） -->
        <table class="w-full text-left border border-gray-300 mt-6">
          <tbody>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 名称
              </th>
              <td class="px-4 py-2 border border-gray-300">语音识别 SDK</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                服务商
              </th>
              <td class="px-4 py-2 border border-gray-300">北京百度网讯科技有限公司</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                使用目的
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <div>使用目的如下：</div>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>
                    使用网络、访问网络状态。目的是为了判断当前是否网络是否连接，如网络已连接，则向最终用户提供在线识别功能。
                  </li>
                  <li>
                    获取设备信息（包括设备型号Android
                    ID、操作系统）目的是为了帮助开发者向最终用户提供服务，同时为了更准确定位并解决开发者以及最终用户在使用语音识别SDK产品和服务时遇到的问题。
                  </li>
                  <li>
                    修改/删除SD卡中的内容。目的是为了将日志等环境信息写入SD卡中，为用户提供一个安全的使用环境，同时为了更准确定位并解决开发者以及最终用户在使用语音识别SDK产品和服务时遇到的问题。如不使用日志记录功能则不需要该权限。
                  </li>
                  <li>
                    获取麦克风权限。目的是为了帮助开发者和最终用户采集需要识别的原始音频数据，从而提供将音频转换为文字的功能。
                  </li>
                  <li>
                    获取蓝牙权限。目的是为了帮助开发者和最终用户发现、配对本地蓝牙设备，请求、接受蓝牙连接和传输音频数据，从而实现蓝牙录音功能。如不使用蓝牙录音功能则不需要该权限。
                  </li>
                </ol>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                收集个人信息类型
              </th>
              <td class="px-4 py-2 border border-gray-300">
                采集常用的设备信息（如 IP 地址、设备唯一ID）、网络状态、网络信息状态、WIFI
                状态、手机状态等
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 政策链接
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <a
                  href="https://ai.baidu.com/ai-doc/REFERENCE/Qkdykq1r3"
                  target="_blank"
                  rel="noopener"
                  class="text-primary-600 hover:underline break-all"
                >
                  https://ai.baidu.com/ai-doc/REFERENCE/Qkdykq1r3
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Alipay 支付宝客户端 SDK 表：左侧为行表头（label），右侧为具体值（value） -->
        <table class="w-full text-left border border-gray-300 mt-6">
          <tbody>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 名称
              </th>
              <td class="px-4 py-2 border border-gray-300">支付宝客户端 SDK</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                服务商
              </th>
              <td class="px-4 py-2 border border-gray-300">支付宝（中国）网络技术有限公司</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                使用目的
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <div>
                  为了保障您的账户和资金安全以及支付服务的安全稳定运行，同时为了履行反洗钱、反恐怖融资、反电信网络诈骗等法定义务，我们需要收集和使用您的下列个人信息：<text
                    class="font-bold"
                    >可变更设备唯一标识、基本设备信息、软件安装列表以及网络信息。</text
                  >为实现网络链路的选择和优化，以提升用户体验，我们需要收集和使用网络信息。
                </div>
                <div class="mt-2">【Android】</div>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>
                    设备状态权限：为了保障您的账户和资金安全以及支付服务的安全稳定运行；为履行反洗钱、反恐怖融资、反电信网络诈骗等法定义务。
                  </li>
                  <li>
                    网络连接权限：允许程序使用网络连接，进行数据传输；允许程序获取当前网络信息。
                  </li>
                </ol>
                <div class="mt-3">【iOS】</div>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>
                    网络连接权限：允许程序使用网络连接，进行数据传输；允许程序获取当前网络信息。
                  </li>
                </ol>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                收集个人信息类型
              </th>
              <td class="px-4 py-2 border border-gray-300 font-medium">
                可变更设备唯一标识、基本设备信息、软件安装列表以及网络信息。
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="w-40 md:w-56 px-4 py-2 border border-gray-300 font-bold bg-gray-50"
              >
                SDK 政策链接
              </th>
              <td class="px-4 py-2 border border-gray-300">
                <a
                  href="https://opendocs.alipay.com/open/54/01g6qm?pathHash=01459d85"
                  target="_blank"
                  rel="noopener"
                  class="text-primary-600 hover:underline break-all"
                >
                  https://opendocs.alipay.com/open/54/01g6qm?pathHash=01459d85
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">三、信息披露</h2>
        <p>在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</p>
        <p>1、经您事先同意，向第三方披露；</p>
        <p>2、为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</p>
        <p>3、根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</p>
        <p>
          4、如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；
        </p>
        <p>
          5、如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
        </p>
        <p>
          6、在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。
        </p>
        <p>7、其它本应用根据法律、法规或者网站政策认为合适的披露。</p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">四、信息存储和交换</h2>
        <p>
          本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，<text
            class="font-bold"
            >我们仅仅是把他存在服务器上，不会影响您的任何隐私情况。您所有产生的数据，我们不会共享面部数据给第三方，我们的服务器没有存储任何用户的面部数据。</text
          >
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">五、Cookie 的使用</h2>
        <p>
          在您未拒绝接受 Cookie 的情况下，本应用会在您的计算机上设定或取用
          Cookie，以便您能登录或使用依赖于 Cookie 的本应用平台服务或功能。
        </p>
        <p>
          您有权选择接受或拒绝接受 Cookie。您可以通过修改浏览器设置的方式拒绝接受
          Cookie。但如果您选择拒绝接受 Cookie，则您可能无法登录或使用依赖于 Cookie
          的本应用网络服务或功能。
        </p>
        <p>通过本应用所设 Cookie 所取得的有关信息，将适用本政策。</p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">六、信息安全</h2>
        <p>
          本应用账号均有安全保护功能，请妥善保管您的用户名相关信息。本应用将通过对用户信息进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">七、本隐私政策的更改</h2>
        <p>
          如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">八、儿童隐私相关</h2>
        <p>
          我们注重儿童的隐私。虽然我们的应用程序可供儿童使用，但是只有家长和/或法定监护人或其他成人可以购买商品。若要设置您的机器人，家长或监护人应下载应用程序。产品使用信息仅用于支持我们的内部运营。<text
            class="font-bold"
            >我们不会有意收集或征求 13
            岁以下的任何人的个人信息。在进行适当的身份验证后，家长或法定监护人可以查看我们收集的关于儿童的信息，要求删除或拒绝允许进一步收集或使用这些信息。请记住，删除这些信息的请求可能会限制儿童访问所有或部分服务。</text
          >
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">九、用户如何管理信息</h2>
        <p>
          访问、更正和删除：您可通过手机系统“设置”-“应用管理”-“权限”-“喵呜”查看您的系统授权权限。若您需要查阅您在使用过程中产生的个人信息，在合理要求下，我们会向您提供。若您无法通过上述方式访问、更正或删除您的个人信息，也可以发送邮件至
          <a href="mailto:support@meupop.com" class="text-primary-600 hover:underline break-all"
            >support@meupop.com</a
          >
          联系我们，我们会在 15 个工作日内回复您。
        </p>
        <p>
          关闭或者撤回授权：您可以通过手机操作系统“权限管理”中关闭存储、电话、位置、通知、相机、摄像头权限，改变授权范围或撤回您的授权。
        </p>
        <p>
          注销：在符合本应用的服务协议约定条件及国家相关法律法规规定的情况下，您的账号可能被注销或删除。当账号注销或被删除后，与该账号相关的、该单项服务项下的全部服务资料和数据将依照单项服务的服务协议约定删除或处理。您也可以主动申请注销账户，您可通过点击“设置-用户信息-注销账号”来进行注销。
        </p>
        注销：在符合本应用的服务协议约定条件及国家相关法律法规规定的情况下，您的账号可能被注销或删除。当账号注销或被删除后，与该账号相关的、该单项服务项下的全部服务资料和数据将依照单项服务的服务协议约定删除或处理。您也可以主动申请注销账户，您可通过点击“设置-用户信息-注销账号”来进行注销。
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">十、知识产权相关</h2>

        <p>
          您了解并同意我方有权随时检查您所上传或发布的内容，如果发现您上传的内容不符合前述规定，我方有权删除或重新编辑或修改您所上传或发布的内容，且有权在不事先通知您的情况下停用您的账号。您亦了解、同意并保证，您所上传或发布的内容符合前述规定，是您的义务，而非我方，我方无任何对您上传或发布的内容进行主动检查、编辑或修改的义务。
        </p>
        <p>
          若您在本软件上的上传或发布内容的行为给第三方带来损害或损失，第三方主张赔偿或衍生的任何其他权利的，由您独立承担全部法律责任，我方及合作方概不承担任何责任。
        </p>
        <p>
          我方不对用户上传或发布的内容的合法性、正当性、完整性或品质作出任何保证，用户需自行承担因使用或依赖由软件所传送的内容或资源所产生的风险，我方在任何情况下对此种风险可能或实际带来的损失或损害都不负任何责任。
        </p>
        <p>
          <text class="font-bold">生成的图片版权归生成此图片的平台用户所有。</text
          >本平台中所有图片作品仅供网友交流学习，分享使用，未经上传用户书面授权，请勿他用。由于平台不拥有此类素材图片的版权，若需商业使用，需获得版权拥有者授权，并遵循国家相关法律、法规之规定。如因非法使用他人图片引起的纠纷，一切后果由使用者自负。
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">十一、法律责任与免责申明</h2>
        <p>
          我方将会尽其商业上的合理努力以保护用户的设备资源及通讯的隐私性和完整性，但是用户承认和同意我方不能就此事提供任何保证。我方可以根据用户的使用状态和行为，为了改进软件的功能、用户体验和服务，开发或调整软件功能。我方为保障业务发展和调整的自主权，有权随时自行修改或中断软件服务而无需通知用户。
        </p>
        <p>
          在任何情况下用户因使用或不能使用本软件所产生的直接、间接、偶然、特殊及后续的损害及风险，我方及合作方不承担任何责任。因技术故障等不可抗事件影响到服务的正常运行的，我方及合作方承诺在第一时间内与相关单位配合，及时处理进行修复，但用户因此而遭受的一切损失，我方及合作方不承担责任。
        </p>
        <p>
          AI
          模型发出的信息是由计算机生成，可能是虚构的，请您自行辨别是非。您在使用本应用咨询医疗、法律等相关问题时，本应用仅提供医疗建议和法律建议，不代表医疗服务法律服务或治疗。用户在使用本应用前必须咨询医生和相关法律人士，对医疗和法律决定负最终责任。本应用的信息及服务应仅供参考，不构成医疗建议法律建议和治疗方式，我们不承担由使用本应用而产生的任何责任。
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">十二、联系我们</h2>
        <p>
          （一）如您对本隐私政策或个人信息保护相关事宜有任何疑问、投诉、建议的，您可以通过如下方式与我们联系：
        </p>
        <ol class="list-decimal pl-6 mt-2 space-y-1">
          <li>联系喵呜的运营人员提交反馈意见；</li>
          <li>
            向
            <a href="mailto:support@meupop.com" class="text-primary-600 hover:underline break-all"
              >support@meupop.com</a
            >
            客服邮箱发送邮件；
          </li>
        </ol>
        <p>
          （二）我们将在核实您的个人信息主体身份后尽快审核所涉请求，并在 15
          日或法律法规规定的期限内完成处理。此外，在与个人信息有关的如下情形下，我们将无法回复您的请求：
        </p>
        <ol class="list-decimal pl-6 mt-2 space-y-1">
          <li>与我们履行法律法规规定的义务相关的；</li>
          <li>与国家安全、国防安全直接有关的；</li>
          <li>与公共安全、公共卫生、重大公共利益直接相关的；</li>
          <li>与刑事侦查、起诉、审判和执行判决等直接相关的；</li>
          <li>有充分证据表明您存在主观恶意或滥用权利的；</li>
          <li>出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；</li>
          <li>响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</li>
          <li>涉及商业秘密的。</li>
        </ol>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
// 页面：隐私协议（采用常规排版，将官方正文直接展示）
</script>

<style scoped>
/* 段落首行缩进：每个段落首行缩进 2 个汉字宽度 */
.policy-body p {
  text-indent: 2em;
}
/* 列表整体缩进：将序号与内容一并右移，避免序号与内容之间出现额外空隙 */
.policy-body ol,
.policy-body ul {
  margin-left: 2em;
}
</style>
