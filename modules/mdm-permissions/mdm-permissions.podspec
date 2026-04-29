require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "mdm-permissions"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/mdm/mdm-permissions"
  s.license      = "MIT"
  s.authors      = { "Mdm" => "mdm@example.com" }
  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/mdm/mdm-permissions.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.dependency "React-Core"
end
